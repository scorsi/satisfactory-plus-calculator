import { useState } from "react";
import { SignUpEmailStep } from "~/components/auth/sign-up/steps/sign-up-email-step";
import { SignUpCodeStep } from "~/components/auth/sign-up/steps/sign-up-code-step";
import { SignUpUsernameStep } from "~/components/auth/sign-up/steps/sign-up-username-step";
import { useSignUp } from "@clerk/nextjs";

enum SignUpStep {
  EMAIL,
  CODE,
  USERNAME
}

type SignUpFormProps = {
  onDone: () => void;
};

export const SignUpForm = (props: SignUpFormProps) => {
  const { onDone } = props;

  const { signUp, setSession, isLoaded } = useSignUp();
  const [formStep, setFormStep] = useState(SignUpStep.EMAIL);
  const [emailAddress, setEmailAddress] = useState("");
  const gotoNextStep = () => setFormStep((formStep) => formStep + 1);

  if (!isLoaded) {
    return null;
  }

  const sendCode = async (emailAddress: string) => {
    const signUpAttempt = await signUp.create({
      emailAddress
    });
    await signUpAttempt.prepareEmailAddressVerification({
      strategy: "email_code"
    });
    setEmailAddress(emailAddress);
    gotoNextStep();
  };

  const verifyCode = async (code: string) => {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
    if (signUpAttempt.verifications.emailAddress.status === "verified") {
      gotoNextStep();
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  };

  const setUsername = async (username: string) => {
    const completeSignUp = await signUp.update({ username });
    if (completeSignUp.status === "complete") {
      await setSession(completeSignUp.createdSessionId, () => {
        onDone();
      });
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  };

  switch (formStep) {
    case SignUpStep.EMAIL:
      return <SignUpEmailStep sendCode={sendCode} />;
    case SignUpStep.CODE:
      return <SignUpCodeStep emailAddress={emailAddress} verifyCode={verifyCode} />;
    case SignUpStep.USERNAME:
      return <SignUpUsernameStep setUsername={setUsername} />;
  }
};
