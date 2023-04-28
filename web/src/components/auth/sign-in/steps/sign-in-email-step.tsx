import { useForm } from "react-hook-form";
import { classNames } from "~/utils/classNames";
import { SIMPLE_EMAIL_REGEX_PATTERN } from "~/utils/regex";
import { Loader2 } from "lucide-react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";


type SignInEmailStepProps = {
  sendCode: (emailAddresse: string) => Promise<void>;
};

export const SignInEmailStep = (props: SignInEmailStepProps) => {
  const { sendCode } = props;

  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<{ email: string }>({ mode: "all" });

  const verifyEmail = async function() {
    try {
      clearErrors();
      await sendCode(getValues("email"));
    } catch (err) {
      setError("email", {
        type: "manual",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
        message: ((err as any).errors[0].longMessage as string) || ""
      });
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(verifyEmail)(e)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            errors.email ? "ring-2 ring-red-500" : ""
          )}
          {...register("email", {
            required: true,
            pattern: SIMPLE_EMAIL_REGEX_PATTERN
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600 text-left" id="email-error">
            {errors.email.message || "You must enter a valid email address."}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-50 disabled:cursor-default disabled:hover:bg-indigo-600 disabled:hover:cursor-default disabled:focus-visible:outline-indigo-600 disabled:focus-visible:outline-offset-2 disabled:focus-visible:outline"
        disabled={isSubmitting || !getValues("email") || !!errors.email}
      >
        {isSubmitting
          ? <><Loader2 className="h-4 w-4" /> Verifying your email and sending code...</>
          : (!!errors.email
            ? <><WrenchScrewdriverIcon className="h-4 w-4" /> Invalid email</>
            : <><PaperAirplaneIcon className="h-5 w-5" /> Send code and continue</>)
        }
      </button>
    </form>
  );
};
