import { TextWithCoin } from "@components/TextWithCoin"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useState } from "react"

interface BetInputProps {
  setBetInput: Dispatch<SetStateAction<boolean>>
}

export function BetInput({ setBetInput }: BetInputProps) {
  const t = useTranslations("BetInput")
  const { lang } = useParams()
  const router = useRouter()

  const [value, setValue] = useState("20")

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative flex max-w-md flex-col items-center gap-3 rounded-lg bg-[--secondary-background-color] shadow">
        <button
          type="button"
          className="absolute right-1.5 top-1.5 text-gray-500 hover:text-gray-700"
          onClick={() => setBetInput(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-5 pb-2 text-center">
          <h3 className="text-xl font-medium text-[--text-color]">
            {t("enter")}
          </h3>
        </div>
        <div
          className="flex items-center justify-center"
          data-te-input-wrapper-init=""
        >
          <input
            type="number"
            className="min-h-[auto] w-[37%] rounded border-0 bg-transparent py-[0.32rem] leading-[1.6] text-[--text-color] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
            id="inputBet"
            step="10"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <div className="-ml-11 pr-2">
            <TextWithCoin text="" width={18} height={18} />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="rounded-full bg-[--button-color] px-5 py-2.5 text-center text-xl font-medium text-[--button-text-color] hover:bg-[--button-color-light] focus:bg-[--button-color-dark] disabled:cursor-not-allowed"
            onClick={() =>
              router.replace(`/${lang}/game?create=true&bet=${value}`)
            }
          >
            {t("ok")}
          </button>
        </div>
      </div>
    </div>
  )
}
