import { useSignIn } from "@clerk/nextjs";

export const SignIn = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const doSignIn = () => {
    void signIn.create({
      strategy: "oauth_google",
      redirectUrl: "/",
    });
  };

  return (
    <div>
      <button onClick={() => doSignIn()}>
        Sign in
      </button>
    </div>
  );
};