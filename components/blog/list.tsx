import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { badgeVariants } from "../ui/badge";
import Link from "next/link";



type CardProps = React.ComponentProps<typeof Card> & {
  title: string;
  content: string;
  thumbnail?: string | null;
  category: string;
  updatedAt: Date;
};
export function CardDemo({ className, title, content, thumbnail, category, updatedAt, ...props }: CardProps) {
  const formattedDate = updatedAt.toLocaleDateString(); 
  return (
    <Card className={cn("w-[340px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="font-bold">{title}</span>
          <span className="text-muted-foreground text-xs">{formattedDate}</span>
        </CardTitle>
        {/* <CardDescription>messages.</CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center rounded-md border p-0 max-w-[340px] max-h-[240px]">
          <Image
            src={thumbnail ?? ""}
            alt="next"
            width={340}
            height={240}
            layout="responsive"
            className="rounded-md max-w-[340px] max-h-[240px] "
          />
        </div>
        <div className="flex justify-between">
          <span className="text-sm">@Hilman King</span>
          <span className="text-xs z-30   ">
            <Link
              href="#"
              className={`${badgeVariants({
                variant: "outline",
              })} bg-primary text-white hover:`}
            >
              {category}
            </Link>
          </span>
        </div>
        <div>
          <p className="text-sm text-justify">
           {content.substring(0, 100)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <small>Ganesha Operation {new Date().getFullYear()}</small>
      </CardFooter>
    </Card>
  );
}
