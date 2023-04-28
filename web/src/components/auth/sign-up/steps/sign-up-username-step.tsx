import { useForm } from "react-hook-form";
import { classNames } from "~/utils/classNames";
import { Loader2, LogInIcon } from "lucide-react";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

type SignUpUsernameStepProps = {
  setUsername: (username: string) => Promise<void>;
}

export const SignUpUsernameStep = (props: SignUpUsernameStepProps) => {
  const { setUsername } = props;

  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<{ username: string }>({ mode: "all" });

  const save = async () => {
    try {
      clearErrors();
      await setUsername(getValues("username"));
    } catch (err) {
      setError("username", {
        type: "manual",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
        message: ((err as any).errors[0].longMessage as string) || ""
      });
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(save)(e)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 text-left">
          Username
        </label>
        <input
          id="username"
          type="text"
          required
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            errors.username ? "ring-2 ring-red-500" : ""
          )}
          {...register("username", {
            required: true
          })}
        />
        {errors.username && (
          <p className="mt-1 text-xs text-red-600 text-left" id="email-error">
            {errors.username.message || "You must enter a valid username."}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-50 disabled:cursor-default disabled:hover:bg-indigo-600 disabled:hover:cursor-default disabled:focus-visible:outline-indigo-600 disabled:focus-visible:outline-offset-2 disabled:focus-visible:outline"
        disabled={isSubmitting || !getValues("username") || !!errors.username}
      >
        {isSubmitting
          ? <><Loader2 className="h-4 w-4" /> Finishing...</>
          : (!!errors.username
            ? <><WrenchScrewdriverIcon className="h-4 w-4" /> Invalid username</>
            : <><LogInIcon className="h-4 w-4" /> Finish</>)
        }
      </button>
    </form>
  );
};
