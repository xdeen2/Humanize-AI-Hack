import { Add, Remove } from '@mui/icons-material';
import { Accordion as AccordionRootComponent, AccordionItem as Item } from '@szhsin/react-accordion'


const AccordionItem = ({ header, headerStyle, contentStyle, numbering, expandButton, showBorder, ...rest } : {header: string, children: any, headerStyle?:string, contentStyle?:string, expandButton?: number, showBorder?: boolean, numbering?: boolean}) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          <span className={`text-lg font-normal max-w-[85%] ${headerStyle}`}>{header}</span>
          {
            expandButton == 0 && <img
                className={`ml-auto transition-transform duration-200 ease-in-out ${
                    isEnter && "rotate-225"
                }`}
                src="/assets/add.svg"
                alt="Chevron"
            />
          }
          {
            expandButton == 1 && <div className="w-6 h-6 flex items-center justify-center ml-auto transition-transform duration-200 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-200 ease-in-out ${
                    isEnter && "rotate-180"
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M19 9l-7 7-7-7" />
                </svg>
            </div>
          }
          {
            expandButton == 2 && <div className="w-9 h-9 flex items-center justify-center ml-auto transition-transform duration-200 ease-in-out bg-white rounded">
                <Add className={`h-5 w-5 fill-black text-black absolute transition-transform duration-200 ease-in-out block ${
                    isEnter && "rotate-180 -z-10"
                }`} />
                <Remove className={`h-5 w-5 fill-black text-black absolute transition-transform duration-200 -z-10 ease-in-out ${
                    isEnter && "rotate-180 !z-10"
                }`} />
            </div>

          }
        </>
      )}
      className={`${showBorder && "border-b"} py-1 !bg-transparent select-none`}
      buttonProps={{
        className: ({ isEnter }) =>
          `flex w-full p-4 text-left`
          // ${
            // isEnter && "bg-slate-200"
          // }
      }}
      contentProps={{
        className: `transition-height duration-200 ease-in-out text-justify ${contentStyle}`
      }}
      panelProps={{ className: "p-4" }}
    />
  );
  

function Accordion(props: {faqs: {
    header: string,
    content: string
}[],
    headerStyle?: string,
    contentStyle?: string,
    expandButon?: number,
    showBorder?: boolean
}) {
  return (
    <AccordionRootComponent transition transitionTimeout={200}>
        {
          props.faqs.map((faq, index) => (
            <AccordionItem key={index} header={faq.header} headerStyle={props.headerStyle} contentStyle={props.contentStyle} showBorder={props.showBorder} expandButton={props.expandButon}>
              {faq.content}
            </AccordionItem>
          ))
        }
      </AccordionRootComponent>
  )
}

Accordion.defaultProps = {
    headerStyle: "",
    contentStyle: "",
    expandButon: 0,
    showBorder: true
}

export default Accordion