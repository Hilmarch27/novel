import {
  Bird,
  Rabbit,
  Turtle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ContentForm from "./content-form";
import { ImageUpload } from "../custom/image-upload";

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

export function Dashboard() {
  return (
    <>
      <main className="grid h-full flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <fieldset className="relative flex h-full min-h-[50vh] flex-col rounded-xl border p-4 lg:col-span-2 md:-mt-[10px]">
          <legend className="-ml-1 px-1 text-sm font-medium">Editor</legend>
          <div className="relative overflow-hidden rounded-lg bg-muted/50 focus-within:ring-1 focus-within:ring-ring h-full">
            <ContentForm />
          </div>
          {/* <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button> */}
        </fieldset>
        <div className="relative h-ful hidden flex-col items-start gap-8 md:flex md:-mt-[10px]">
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4 min-h-[550px] max-h-[500px]">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Thumbnail
              </legend>
              <div>
                <ImageUpload />
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4 max-h-[260px]">
              <legend className="-ml-1 px-1 text-sm font-medium">Author</legend>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </fieldset>
          </form>
        </div>
      </main>
    </>
  );
}
