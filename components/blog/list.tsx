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



type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({ className, ...props }: CardProps) {
  return (
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span className="font-bold">Notifications</span>
            <span className="text-muted-foreground text-xs">23-06-2024</span>
          </CardTitle>
          {/* <CardDescription>messages.</CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center rounded-md border p-0 max-w-[340px] max-h-[240px]">
            <Image
              src="https://res.cloudinary.com/dzxxupjbz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1724116366/king-doel_fltcfa.jpg"
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
                Sigma
              </Link>
            </span>
          </div>
          <div>
            <p className="text-sm text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsa soluta officia adipisci quae nostrum voluptates nisi recusandae totam maxime animi, exercitationem obcaecati fugiat repellat?</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <small>Ganesha Operation {new Date().getFullYear()}</small>
        </CardFooter>
      </Card>
  );
}
