import React from 'react'
import { BsCheckCircleFill, BsCircleFill } from 'react-icons/bs'
import Button from './Button'
import toast from 'react-hot-toast'

function PricingCard(props: PricingProps) {
  return (
    <div className="rounded-sm bg-neutral-400 text-bg-light-black flex flex-col items-start p-6 h-full w-full">

        <span className="text-lg font-semibold flex flex-row  justify-between items-center w-full">
            {props.title}

            {
                props.active ? (
                    <span className="text-xs py-1 px-2 rounded-lg border-2 border-green-600 bg-transparent text-green-600">
                        Currently Active
                    </span>
                ) : null
            }
        </span>

        <div className="flex flex-col items-start my-3 mb-5 w-full">
            <div className="flex flex-row gap-2 items-end">
            <span className="text-5xl font-semibold">
            {props.pricing.find(p => p.interval === props.interval)?.currency}&nbsp;
                {props.pricing.find(p => p.interval === props.interval)?.amount}
            </span>
            </div>

            <span className="text-sm text-bg-50">
                {props.interval === "monthly" ? "per month" : "per year"}
            </span>

        </div>

        <div className="flex flex-col gap-2 items-start pt-5 border-t border-neutral-700 w-full grow">
            <span className="text-bg-100 font-medium my-2">What&apos;s Included?</span>
            {props.features.map((feature, index) => (
                <span key={index} className="text-sm flex gap-2 items-center text-bg-300">
                    <BsCheckCircleFill className="w-4 min-w-[16px] h-4 min-h-[16px] text-green-600" />
                    {feature}
                </span>
            ))}
        </div>

        <Button
            className="mt-5 w-full justify-center !bg-bg-light-black !text-white hover:!bg-neutral-100 hover:!text-bg-light-black hover:border hover:border-black !border border-black"
            variant="primary"
            onClick={() => {
                props.active ?
                toast("You are already subscribed to this plan") :
                toast("Coming Soon")
            }}
            >
                {
                    props.active ? "Already Active" : "Coming Soon"
                }
                {
                    props.active ? null : <img src="/assets/thunder-gold.svg" className="w-4 h-4 ml-2" alt="Coming Soon" />
                }
            </Button>
    </div>
  )
}

export interface PricingProps {
    active?: boolean,
    title: string,
    pricing: Plan[],
    interval?: "monthly" | "yearly"
    features: string[]
}

export interface Plan {
    currency: string,
    amount: string,
    interval: "monthly" | "yearly"
}

PricingCard.defaultProps = {
    active: false,
    title: "Basic",
    pricing: [
        {
            currency: "$",
            amount: 0,
            interval: "monthly"
        },
        {
            currency: "$",
            amount: 0,
            interval: "yearly"
        }
    ],
    interval: "monthly",
    features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
        "Feature 6",
        "Feature 7",
    ]
}

export default PricingCard