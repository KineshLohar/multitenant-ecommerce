import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className=" flex flex-col gap-8 items-start justify-center p-4">

      <Button variant='elevated'>I am Button</Button>
      <Input placeholder="sdjfsdjkfsd" />
      <Progress value={69} />
      <Textarea placeholder="sadadasdasd" />
    </div>
  );
}
