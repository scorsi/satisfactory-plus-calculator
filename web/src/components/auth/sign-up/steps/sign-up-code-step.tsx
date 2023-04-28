import { useForm } from "react-hook-form";
import { classNames } from "~/utils/classNames";
import { Loader2 } from "lucide-react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

type SignUpCodeStepProps = {
  emailAddress: string;
  verifyCode: (code: string) => Promise<void>;
};

export const SignUpCodeStep = (props: SignUpCodeStepProps) => {
  const { emailAddress, verifyCode } = props;

  const {
    register,
    getValues,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<{ code: string }>({ mode: "all" });

  const onSubmit = async () => {
    try {
      clearErrors();
      await verifyCode(getValues("code"));
    } catch (err) {
      console.error(err);
      setError("code", {
        type: "manual",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
        message: ((err as any).errors[0].longMessage as string) || ""
      });
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="flex flex-col gap-4">
      <span className="">
        A 6-digit code was just sent to {emailAddress}
      </span>
      <div>
        <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900 text-left">
          Code
        </label>
        <input
          id="code"
          type="text"
          autoComplete="email"
          required
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            errors.code ? "ring-2 ring-red-500" : ""
          )}
          {...register("code", {
            required: true,
            minLength: 6,
            maxLength: 6
          })}
          onPaste={() => void trigger("code")}
        />
        {errors.code && (
          <p className="mt-1 text-xs text-red-600 text-left" id="email-error">
            {errors.code.message || "You must enter a valid code."}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-50 disabled:cursor-default disabled:hover:bg-indigo-600 disabled:hover:cursor-default disabled:focus-visible:outline-indigo-600 disabled:focus-visible:outline-offset-2 disabled:focus-visible:outline"
        disabled={isSubmitting || !getValues("code") || !!errors.code}
      >
        {isSubmitting
          ? <><Loader2 className="h-4 w-4" /> Verifying...</>
          : (!!errors.code
            ? <><WrenchScrewdriverIcon className="h-4 w-4" /> Invalid code</>
            : <><CheckIcon className="h-4 w-4" /> Verify</>)
        }
      </button>
    </form>
  );
};