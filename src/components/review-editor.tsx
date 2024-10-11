"use client"

import { createReveiwAction } from "@/actions/create-review.action"
import style from "./review-editor.module.css"
import { useActionState, useEffect } from "react"

export function ReviewEditor({bookId}:{bookId:string}){

    const [state, formAction, isPending] = useActionState(
      createReveiwAction, null);

    useEffect(()=>{
      if( state && !state.status){
        alert(state.error);
      }
    }, [state]);

    return(
      <section>
        <form className={style.form_container} action={formAction}>
          <input name="bookId" defaultValue={bookId} hidden/>
          <textarea disabled={isPending} required name="content" placeholder="리뷰내용"/>
          <div className={style.submit_container}>
            <input disabled={isPending} required name="author" placeholder="작성자"/>
            <button disabled={isPending} type="submit">
              {isPending ? "...":"작성하기"}
            </button>
          </div>
        </form>
      </section>
    )
  }