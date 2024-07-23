"use client";
import Button from "@/components/Button";
import Link from "@/components/Link";

const TestePage = () => {
  return (
    <div className="w-80 flex justify-center flex-col">
      <Button appearance="primary" onClick={console.log}>
        clique em mim
      </Button>
      <Button appearance="secondary" onClick={console.log}>
        clique em mim 2
      </Button>
      <Link href="/">pagina inicial</Link>
    </div>
  );
};

export default TestePage;
