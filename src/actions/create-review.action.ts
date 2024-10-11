"use server";

import { revalidateTag } from "next/cache";
import { delay } from "@/util/delay";


export async function createReveiwAction( _ : any , formDate: FormData){
    const bookId = formDate.get('bookId')?.toString();
    const content = formDate.get('content')?.toString();
    const author = formDate.get('author')?.toString();

    if(!bookId || !content || !author){
      return{
        status: false,
        error : "리뷰 내용과 작성자를 입력해주세요",
      }
    }

    try{
      await delay(2000);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
        {
          method: "POST",
          body: JSON.stringify({bookId,content, author}),
        });
        if(!response.ok){
          throw new Error(response.statusText);
        }

        revalidateTag(`review-${bookId}`);
        return{
          status: true,
          error : "",
        }
    }catch(err){
      console.error(err);
      return{
        status: false,
        error : `리뷰 저장에 실패했습니다 : ${err}`,
      }
    }

  }