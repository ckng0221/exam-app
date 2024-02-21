"use server";
import { revalidatePath } from "next/cache";

//Currently, revalidatePath invalidates all the routes in the client-side Router Cache. This behavior is temporary and will be updated in the future to apply only to the specific path.
// Specific page only works for server-side router Cache
export async function revalidateLayout() {
  revalidatePath("/", "layout");
}

export async function revalidatePage(page: string) {
  revalidatePath(page, "page");
}
