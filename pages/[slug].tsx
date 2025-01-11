import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";

import DefaultLayout from "@/layouts/default";
export async function getServerSideProps(context) {
  const { params, query } = context;

  return { props: { params: params, query: query } };
}
export default function IndexPage(context: any) {
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isQueryFriendLoading, setIsQueryFriendLoading] = useState(false);
  const [cardKey, setCardKey] = useState(context.params.slug);
  const queryFriend = () => {
    setIsQueryFriendLoading(true);
  };
  const addFriend = () => {
    setIsAddLoading(true);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div> */}
        <Input
          isClearable
          isReadOnly
          className="max-w-xs"
          defaultValue=""
          label="key(不可修改)"
          value={cardKey}
        />
        <Input
          isClearable
          isRequired
          className=" max-w-xs"
          defaultValue=""
          label="宝可梦ID"
          type="number"
        />
        <Button color="primary" isLoading={isAddLoading} onPress={addFriend}>
          提交添加好友
        </Button>

        <Button
          color="success"
          isLoading={isQueryFriendLoading}
          onPress={queryFriend}
        >
          查询添加好友截图
        </Button>
      </section>
    </DefaultLayout>
  );
}

