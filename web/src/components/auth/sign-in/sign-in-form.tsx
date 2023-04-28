import React, { useState } from "react";
import { SignInEmailStep } from "~/components/auth/sign-in/steps/sign-in-email-step";
import { SignInCodeStep } from "~/components/auth/sign-in/steps/sign-in-code-step";
import { useSignIn } from "@clerk/nextjs";

enum SignInStep {
  EMAIL,
  CODE
}

type SignInFormProps = {
  onDone: () => void;
};

export const SignInForm = (props: SignInFormProps) => {
  const { onDone } = props;

  const { signIn, setSession, isLoaded } = useSignIn();
  const [formStep, setFormStep] = useState(SignInStep.EMAIL);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const gotoNextStep = () => setFormStep((formStep) => formStep + 1);

  if (!isLoaded) return null;

  const sendCode = async (emailAddress: string) => {
    const signInAttempt = await signIn.create({
      identifier: emailAddress
    });

    const emailCodeFactor = signInAttempt.supportedFirstFactors
      .find((factor) => factor.strategy === "email_code") as { emailAddressId: string } | undefined;

    if (!emailCodeFactor) {
      throw new Error("Something went wrong. Please try again.");
    }

    await signInAttempt.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId: emailCodeFactor.emailAddressId
    });

    setEmailAddress(emailAddress);
    gotoNextStep();
  };

  const verifyCode = async (code: string) => {
    const signInAttempt = await signIn.attemptFirstFactor({
      strategy: "email_code",
      code
    });
    if (signInAttempt.status === "complete") {
      await setSession(signInAttempt.createdSessionId, () => {
        onDone();
      });
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  };

  switch (formStep) {
    case SignInStep.EMAIL:
      return <SignInEmailStep sendCode={sendCode} />;
    case SignInStep.CODE:
      return <SignInCodeStep emailAddress={emailAddress} verifyCode={verifyCode} />;
  }
};
