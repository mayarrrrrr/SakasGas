import { UilUsdSquare, UilMoneyWithdrawal, UilClipboardAlt } from "@iconscout/react-unicons";

export const CardsData = [
    {
        title: "Sales", 
        color: {
            backGround: "linear-gradient(143deg, rgba(59,133,255,1) 55%, rgba(54,175,255,1) 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970", 
        png: UilUsdSquare,
        series: [
            {
                name: "Sales", 
                data : [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    }, 
    {
        title: "Revenue",
        color: {
          backGround: "linear-gradient(234deg, rgba(39,142,11,1) 2%, rgba(6,214,84,1) 87%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",

        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
          {
            name: "Revenue",
            data: [10, 100, 50, 70, 80, 30, 40],
          },
        ],
      },
      {
        title: "Expenses",
        color: {
          backGround:
            "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
          boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
          {
            name: "Expenses",
            data: [10, 25, 15, 30, 12, 15, 20],
          },
        ],
      },
]