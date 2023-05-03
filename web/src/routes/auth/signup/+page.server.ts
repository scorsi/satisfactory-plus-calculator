import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";

import type { Actions, PageServerLoad } from "./$types";

import { signUpSchema } from "$lib/schemas/signup.schema";

export const load = (async ({ locals }) => {
	// const session = await locals.auth.validate();
	// if (session) throw redirect(302, "/");

	return {
		form: superValidate(signUpSchema),
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, password } = form.data;

		try {
			// const user = await auth.createUser({
			// 	primaryKey: {
			// 		providerId: "email",
			// 		providerUserId: email,
			// 		password,
			// 	},
			// 	attributes: {
			// 		email,
			// 		username,
			// 	},
			// });
			// await auth.createKey(user.userId, {
			// 	type: "persistent",
			// 	providerId: "username",
			// 	providerUserId: username,
			// 	password,
			// });
			// const session = await auth.createSession(user.userId);
			// locals.auth.setSession(session);
		} catch (error) {
			console.error(error);
			return fail(400, { form });
		}
		throw redirect(302, "/");
	},
};
