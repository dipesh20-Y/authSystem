import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUserSignIn = useCallback(
    async (authUser) => {
      if (!authUser) return;

      //check if user exists in profile table
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", authUser.id)
        .single();

      if (existingProfile) {
        setUser(existingProfile);
      } else {
        //create user profile
        const { data: newProfile, error } = await supabase
          .from("profiles")
          .upsert({
            user_id: authUser.id,
            fullName:
              authUser.user_metadata?.full_name ||
              authUser.user_metadata?.name ||
              "",
            username:
              authUser.user_metadata?.username || authUser.email.split("@")[0],
            email: authUser.email,
          })
          .select()
          .single();

        if (error) {
          console.log("error creating profile", error);
        } else {
          setUser(newProfile);
        }
      }

      navigate("/dashboard");
    },
    [navigate]
  );

  useEffect(() => {
    //check for user session
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        setUser(profileData || session?.user);
      }
      setLoading(false);
    };

    checkUser();

    // setup auth listener

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (Event, session) => {
      if (Event == "SIGNED_IN") {
        await handleUserSignIn(session.user);
      } else if (Event == "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [handleUserSignIn]);

  const signup = async (email, password, userData) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    setLoading(false);

    if (error) {
      console.log("error while creating profile: ", error);
    }
    return data;
  };

  const signin = async (email, password) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      throw error;
    }

    return data;
  };

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      console.log("Error while signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, signin, signInWithGithub, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
