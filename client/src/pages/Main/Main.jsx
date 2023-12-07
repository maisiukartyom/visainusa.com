import "./main.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import { MainPhoto } from "../../components/MainPhoto";
import SupportEngine from "../../components/SupportEngine";
import axios from "../../api/axios";
import {toast} from 'react-toastify';
import CallForm from "../../components/CallForm/CallForm";


const  Main = ({isUser, user}) => {

  const {state} = useLocation();
  const [levelsInfo, setLevelsInfo] = useState([]);
  const [hasInfo, setHasInfo] = useState(false);

  useEffect(() => {
    const getLevelsCosts = async () => {
      try{
        const levels = await axios.get("/payment/getLevelsCosts");
        setLevelsInfo(levels.data.levels);
        setHasInfo(true);
      }
      catch(err){
        toast.error("Error to get levels info!",{
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          }
        );
        setHasInfo(false)
      }
    }

    getLevelsCosts();

    if (state?.hash){
      document.getElementById(state.hash).scrollIntoView();
      window.history.replaceState(null, document.title)
    }

    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
  }, [state])

  return (
    <>
      <div className="main">
        {!isUser && <>
          <div className="titrecenter">
          <p className="titre titre-bottom" id="advantages" data-aos="fade-up">
            Our Advantages
          </p>
        </div>
        <div className="blok">
          <div className="place blue" data-aos="zoom-in-up">
            <a href="#pricing">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="71"
                height="71"
                viewBox="0 0 71 71"
                fill="none"
              >
                <g clipPath="url(#clip0_3_98)">
                  <path
                    d="M20.5722 57.3093V68.2571C20.5486 69.6447 21.9749 70.6864 23.2655 70.2251L35.7695 65.9999L48.2735 70.2251C49.5645 70.6864 50.9906 69.6444 50.9669 68.2571V57.3093C42.0241 62.3798 29.5151 62.3798 20.5722 57.3093V57.3093Z"
                    fill="white"
                  />
                  <path
                    d="M42.3822 27.0532H29.1569C26.4265 26.9448 26.4286 23.0595 29.1569 22.9522H44.5865C47.7057 22.8286 47.7023 18.3932 44.5865 18.268H40.1781C39.0416 18.268 38.1202 17.3499 38.1202 16.2175C37.991 13.1103 33.5476 13.1113 33.4189 16.2175C33.4189 17.3499 32.4975 18.268 31.361 18.268H29.1569C20.188 18.639 20.195 31.3697 29.1569 31.7373H42.3822C45.1126 31.8457 45.1106 35.731 42.3822 35.8383H26.9526C23.8321 35.9621 23.8382 40.3983 26.9526 40.5226H31.361C32.4975 40.5226 33.4189 41.4406 33.4189 42.5731C33.5481 45.6802 37.9915 45.6793 38.1202 42.5731C38.1202 41.4406 39.0416 40.5226 40.1781 40.5226H42.3822C51.351 40.1516 51.3442 27.4208 42.3822 27.0532V27.0532Z"
                    fill="white"
                  />
                  <path
                    d="M35.7695 0.86084C20.2067 0.86084 7.54531 13.555 7.54531 29.1582C9.09574 66.6985 62.449 66.6876 63.9937 29.1579C63.9936 13.555 51.3324 0.86084 35.7695 0.86084ZM42.3162 44.3282H41.8391C39.8722 50.1279 31.6644 50.1242 29.6998 44.3282H27.0405C21.3776 44.3408 18.4963 37.3635 22.5149 33.3705C22.5429 33.3423 22.5712 33.3145 22.5996 33.287C14.6196 27.0308 18.9665 14.0428 29.2227 13.9882H29.6998C31.6667 8.18846 39.8745 8.19214 41.8391 13.9882H44.4984C50.1614 13.9755 53.0428 20.9532 49.0239 24.9459C48.9959 24.9739 48.9677 25.0018 48.9393 25.0293C56.9195 31.2855 52.5724 44.2736 42.3162 44.3282V44.3282Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3_98">
                    <rect
                      width="69.475"
                      height="69.475"
                      fill="white"
                      transform="translate(0.721878 0.86084)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="par  white">Affordable prices </p>
              <p className="grey text">
              Our mission is to help everyone sort out in very simple language how EB3 unskilled program works and make the process as cheap as possible. Our prices start from $0, check it out on Level 1 
              </p>
            </a>
          </div>
          <div className="place light" data-aos="zoom-in-up">
            <a href="#testimonials">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="71"
                height="71"
                viewBox="0 0 71 71"
                fill="none"
              >
                <g clipPath="url(#clip0_3_79)">
                  <path
                    d="M37.6338 0.86084C33.2231 0.86084 29.5031 4.69225 29.5031 9.23506C29.5031 13.7779 33.2231 17.6093 37.6338 17.6093C42.0445 17.6093 45.6312 13.7779 45.6312 9.23506C45.6312 4.69225 42.0445 0.86084 37.6338 0.86084Z"
                    fill="#244B7A"
                  />
                  <path
                    d="M46.7646 17.6093C44.5047 20.129 41.268 21.7447 37.6357 21.7447C34.0035 21.7447 30.6297 20.129 28.3698 17.6093C26.3969 19.8092 25.1609 22.6911 25.1609 25.8801V27.9478C25.1609 29.0907 26.0807 30.0155 27.2172 30.0155H47.9172C49.0537 30.0155 49.9734 29.0907 49.9734 27.9478V25.8801C49.9734 22.6911 48.7375 19.8092 46.7646 17.6093Z"
                    fill="#244B7A"
                  />
                  <path
                    d="M20.3952 63.3989L10.1484 42.7949C9.15902 40.8053 6.75098 39.9939 4.7648 40.9808L2.08665 42.3114C1.08947 42.8074 0.683709 44.0229 1.18143 45.0213L13.2457 69.221C13.7418 70.2189 14.9487 70.6161 15.9378 70.1268L18.5815 68.8132C20.5755 67.8226 21.3882 65.3961 20.3952 63.3989Z"
                    fill="#244B7A"
                  />
                  <path
                    d="M68.7733 34.6351C67.0956 33.4176 64.7632 33.6611 63.3721 35.1626L52.1879 48.7984C51.4105 49.61 49.9374 50.097 49.16 50.097H39.6259C38.4801 50.097 37.58 49.2043 37.58 48.0679C37.58 46.9314 38.4801 46.0387 39.6259 46.0387C42.3661 46.0387 45.3997 46.0387 47.8095 46.0387C50.06 46.0387 51.9013 44.2125 51.9013 41.9805C51.9013 39.7485 50.06 37.9222 47.8095 37.9222C38.2012 37.9222 47.3662 37.9222 37.089 37.9222C36.0693 37.9222 35.5609 37.2809 34.7567 36.5829C31.5911 33.7577 26.8528 32.3965 22.0559 33.4993C19.3924 34.1115 17.5962 35.1787 15.7746 36.6097L15.7139 36.5608L12.7547 39.1438L24.3841 62.2718H27.8278H47.8095C51.6558 62.2718 55.3386 60.4455 57.63 57.4018L69.6325 40.3572C70.9828 38.5714 70.6145 35.9744 68.7733 34.6351Z"
                    fill="#244B7A"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3_79">
                    <rect
                      width="69.475"
                      height="69.475"
                      fill="white"
                      transform="translate(0.96875 0.86084)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="par ">Individual approach</p>
              <p className="grey-dark text">
              We speak your first language, schedule a consultations at times that suit you, and provide access to our exclusive community, where you can chat from clients who have already applied for the EB3 unskilled visa category.
              </p>
            </a>
          </div>
          <div className="place blue" data-aos="zoom-in-up">
            <Link to="/aboutus">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="71"
                viewBox="0 0 70 71"
                fill="none"
              >
                <g clipPath="url(#clip0_3_67)">
                  <path
                    d="M69.6406 54.916C68.6478 54.7713 62.4355 53.8656 61.436 53.7199C60.9918 52.8171 58.2138 47.169 57.7667 46.2604V46.2606L57.7666 46.2607C57.3211 47.1665 54.5448 52.8109 54.0976 53.7199C53.2044 53.8503 48.0899 54.5958 46.3435 54.8504C47.582 53.6391 48.6892 52.5561 49.2032 52.0534C46.5271 51.6632 40.9006 50.8429 39.3214 50.6128C38.1247 48.1796 35.6085 43.0639 34.9022 41.6282C33.7055 44.0612 31.1892 49.1771 30.483 50.6128C27.8071 51.0029 22.1807 51.8233 20.6015 52.0534C21.3385 52.7741 22.3848 53.7975 23.4611 54.8501C21.7161 54.5957 16.6072 53.8509 15.7086 53.7199C15.2645 52.8171 12.4864 47.169 12.0395 46.2601L12.0388 46.2617L12.0381 46.2631C11.5926 47.1689 8.81731 52.8111 8.37028 53.72C7.37714 53.8646 1.16514 54.7702 0.165623 54.916C0.884114 55.6188 5.37922 60.0152 6.10256 60.7226C5.93295 61.7149 4.87178 67.9229 4.70106 68.9219C5.59207 68.4518 11.1438 65.5231 12.038 65.0513L12.0387 65.0509L12.0394 65.0505C12.9275 65.5191 18.4838 68.4502 19.3778 68.9219C19.2082 67.9295 18.1469 61.7215 17.9762 60.7226C18.647 60.0664 22.6094 56.191 23.7208 55.1043C25.3907 56.7375 27.0789 58.3887 27.7517 59.0468C27.2947 61.7208 26.3335 67.3435 26.0637 68.9215C28.4573 67.659 33.4898 65.0042 34.9021 64.2594C37.2956 65.5219 42.3281 68.1767 43.7404 68.9215C43.2833 66.2475 42.3222 60.6247 42.0524 59.0469C43.0574 58.064 44.637 56.5189 46.0844 55.1035C47.192 56.1867 51.1544 60.062 51.8297 60.7226C51.66 61.7149 50.5989 67.9229 50.4281 68.9219C51.3162 68.4534 56.8723 65.5224 57.7663 65.0506H57.7665V65.0505C58.6546 65.5191 64.2108 68.4502 65.1049 68.9219C64.9353 67.9295 63.8741 61.7215 63.7034 60.7226C64.4222 60.0198 68.9173 55.6233 69.6406 54.916Z"
                    fill="white"
                  />
                  <path
                    d="M16.7214 37.2858V35.2022C16.7214 31.7457 17.7005 28.5135 19.3953 25.7655C18.6907 25.2821 17.9329 24.8767 17.1362 24.5589C18.3781 23.4158 19.1579 21.78 19.1579 19.9652C19.1579 16.5183 16.3473 13.7141 12.8926 13.7141C9.43808 13.7141 6.62733 16.5183 6.62733 19.9652C6.62733 21.779 7.40618 23.414 8.64685 24.557C4.40956 26.2453 1.40625 30.3791 1.40625 35.2023V37.286H12.8926H16.7214V37.2858Z"
                    fill="white"
                  />
                  <path
                    d="M53.0848 35.2023V37.286H56.9136H68.4V35.2023C68.4 30.3792 65.3968 26.2453 61.1594 24.557C62.4001 23.414 63.1789 21.779 63.1789 19.9652C63.1789 16.5183 60.3683 13.7141 56.9136 13.7141C53.4588 13.7141 50.6483 16.5185 50.6483 19.9652C50.6483 21.78 51.428 23.4159 52.6701 24.5589C51.8723 24.8773 51.1146 25.2829 50.4109 25.7655C52.1058 28.5135 53.0848 31.7459 53.0848 35.2023Z"
                    fill="white"
                  />
                  <path
                    d="M49.1693 35.2062H49.1703C49.1703 29.274 45.4201 24.2128 40.1467 22.2326C43.6362 20.4478 46.03 16.8347 46.03 12.6742C46.03 6.74909 41.1775 1.92822 35.2133 1.92822C29.249 1.92822 24.3966 6.74909 24.3966 12.6742C24.3966 16.8347 26.7903 20.4478 30.2799 22.2326C25.0065 24.2128 21.2562 29.274 21.2562 35.2062V37.286H49.1693V35.2062Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3_67">
                    <rect
                      width="69.475"
                      height="69.475"
                      fill="white"
                      transform="translate(0.165627 0.687378)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="par  white">Professional team</p>
              <p className="grey text">
              All members of our team have personally completed the EB3 unskilled program and received green cards. We have unique first-hand knowledge of EB3 program and ready to assit you! 
              </p>
            </Link>
          </div>
          <div className="place light" data-aos="zoom-in-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="71"
              viewBox="0 0 70 71"
              fill="none"
            >
              <g clipPath="url(#clip0_3_45)">
                <path
                  d="M55.0641 22.9079V41.7307C53.6588 42.7907 51.7947 43.0772 50.1313 42.5042L49.5864 42.3037C51.2784 38.9803 50.6475 34.9121 47.9804 32.1904L38.3156 22.5355L46.0015 19.8424L55.0641 22.9079Z"
                  fill="#244B7A"
                />
                <path
                  d="M31.7987 36.1146L42.0375 46.1795V46.2085C41.7765 47.1366 41.2834 47.9778 40.5873 48.6739C39.3401 49.8921 37.6868 50.5012 36.0625 50.4142L25.1566 39.5083C24.8955 39.7403 24.7795 40.0594 24.7795 40.3784C24.7795 40.7555 24.9536 41.1616 25.3306 41.3936L35.6854 51.5454C35.3954 52.2416 34.9893 52.8797 34.4382 53.4308C33.249 54.62 31.6827 55.2001 30.1164 55.2001C28.6082 55.2001 27.0999 54.649 25.9397 53.5178L19.5586 47.7457C18.1664 46.4695 16.5421 45.5704 14.7438 45.0193C14.7728 44.9322 14.7728 44.8452 14.7728 44.7582V20.3938L22.2271 17.3192C24.3735 16.4201 26.7809 16.5941 28.7532 17.6673L28.2891 17.8993C25.7947 19.1466 24.0254 21.525 23.5323 24.3675C23.0972 27.123 24.0254 29.9655 25.9977 31.9669C27.448 33.4171 29.3913 34.3163 31.4507 34.4903C31.3057 34.6934 31.2476 34.8964 31.2476 35.0995C31.2476 35.5055 31.4217 35.8826 31.7987 36.1146Z"
                  fill="#244B7A"
                />
                <path
                  d="M47.4247 41.5546C47.1914 42.0139 46.8997 42.4158 46.5205 42.789C45.3831 43.9085 44.0414 44.5401 42.6415 44.6549L32.1125 34.3205H32.4625C33.8625 34.3205 35.2624 33.976 36.4874 33.3732L37.4207 32.8852L42.4373 30.3877L46.4914 34.3779C46.4914 34.3779 46.4914 34.3779 46.5205 34.4066C48.4455 36.33 48.7663 39.2867 47.4247 41.5546Z"
                  fill="#244B7A"
                />
                <path
                  d="M10.0526 47.1361H2.6864C1.46655 47.1361 0.476532 46.1565 0.476532 44.9495V20.168C0.476532 18.961 1.46655 17.9814 2.6864 17.9814H10.0526C11.2725 17.9814 12.2625 18.961 12.2625 20.168V44.9495C12.2625 46.1565 11.2725 47.1361 10.0526 47.1361Z"
                  fill="#244B7A"
                />
                <path
                  d="M67.7417 47.1361H60.3755C59.1556 47.1361 58.1656 46.1565 58.1656 44.9495V20.168C58.1656 18.961 59.1556 17.9814 60.3755 17.9814H67.7417C68.9615 17.9814 69.9516 18.961 69.9516 20.168V44.9495C69.9516 46.1565 68.9615 47.1361 67.7417 47.1361Z"
                  fill="#244B7A"
                />
                <path
                  d="M52.5465 18.2214C52.5174 18.2214 52.4883 18.1923 52.4302 18.1923L45.7767 15.4645C43.7139 14.623 41.3895 14.681 39.3847 15.6967L31.4528 19.6723L29.7967 20.4849C28.1115 21.3264 26.9203 22.9515 26.6007 24.8088C26.3102 26.666 26.9203 28.5813 28.2568 29.9162C29.3899 31.0479 30.9008 31.6283 32.4116 31.6283C33.3123 31.6283 34.2421 31.4252 35.0846 30.9899L36.0434 30.4966L40.1983 28.4072L51.762 22.6033L55.6262 24.1994V20.1076C55.6262 19.9045 55.6262 19.7014 55.6843 19.5272L52.5465 18.2214Z"
                  fill="#244B7A"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_45">
                  <rect
                    width="69.475"
                    height="69.475"
                    fill="white"
                    transform="translate(0.476532 0.612549)"
                  />
                </clipPath>
              </defs>
            </svg>
            <p className="par ">Reliable partners</p>
            <p className="grey-dark text">
              Immigration lawyers and former USCIS officers who helped hundreds
              of people obtain green cards through EB3 program
            </p>
          </div>
        </div>
        <div className="titrecenter">
          <p data-aos="fade-up"></p>
        </div>
        <a id="competans"></a>
        <div className="vie"></div>
        <a id="adresse"></a>
        </>
        }





        <div id="pricing" className="titrecenter-column">
          <p className="titre" data-aos="fade-up">
            Start your EB3 journey{" "}
          </p>
          <p className="titre-column">by choosing below level</p>
        </div>
        <div className="grid">
          {/* <div className={user.level >= 1 ? "level-paid" : "level-lev"}>
            {
              user.level >= 1 && <p className="coming-newDesign">Paid</p>
            } */}

            <div className={"level-paid"}>
            {/* <p className="coming-newDesign">Paid</p> */}
            <h2 className="appliName-future">Level 1</h2>
            
            <div className="price-all">
          {hasInfo && <p className="appliName-levelOne-del price-all">${levelsInfo[0].originalCost}</p>}
                <p className="appliName-levelOne price">FREE</p>
              </div>
              <Link to='/levelone'>
            <div className="text-discription-future">
              <p className="description-future ">
              What is EB3 unskilled visa category?
              </p>
              <p className="description-future ">
              Am I eligible for EB3 unskilled visa?
              </p>
              <p className="description-future">
              How much does EB3 unskilled cost? 
              </p>
              <p className="description-future">
              How does EB3 unskilled visa work?
              </p>
              <p className="description-future ">
              How do I start my EB3 journey?
              </p>
              <p className="description-future ">
              How long does it take to get the U.S. permanent resident card?
              </p>
              <p className="description-future description-future">
              Can I adjust my status to EB3 unskilled?
              </p>
              <p className="description-future ">
              What should I do in case of refusal?
              </p>
              <p className="description-future ">
              I worked unauthorized, can I apply for the EB3 unskilled?
              </p>
              <p className="description-future ">
              How to move from political asylum to EB3 unskilled?
              </p>
              <p className="description-future ">
              How does the EB3 unskilled program work for the U. S. employer ?
              </p>
              <p className="description-future description-future-finaly">
              How can you legally earn money in the USA while in student or tourist status?
              </p>
                          </div></Link>
<div className="lev-btn">
                          <div className="center-level">
              <Link to='/levelone'>
                <button className="btn-levels">CHOOSE</button>
              </Link>
              </div>
              </div>
          </div>


<div className={user.level >= 2 ? "level-paid" : "levellev"}>
          {
              user.level >= 2 && <p className="coming-newDesign">Paid</p>
            }
            <h2 className="appliName-future">Level 2</h2>
            <h3 className="appliName-names">"Immigration with no mistake"</h3>
            { 
              ((user.level && user.level < 2) || !user.level) &&
            <>
            <div className="price-all">
            {hasInfo && <p className="appliName-levelOne-del price-all">${levelsInfo[1].originalCost}</p>}
              {hasInfo && <p className="appliName-level-two price-all">${levelsInfo[1].cost}</p>}
                </div>
              </>
}
<Link to='/leveltwo'><div className="text-discription-future">
              <p className="description-future ">
              Personal consultation (60 mins) on English, Spanish or Russian languages
              </p>
              <p className="coming-bonus">
              Our services include:
              </p>
              <p className="description-future">
              In-depth insights into the EB3 unskilled program
              </p>
              <p className="description-future ">
              Deep analysis of your specific situation
              </p>
              <p className="description-future ">
              Step-by-step guidance on obtaining a green card
              </p>
              <p className="description-future ">
              General information about other immigration programs in the U.S.
              </p>
              <p className="description-future ">
              Enjoy 24/7 online chat support for any additional questions or clarifications after your consultation
              </p>
              <p className="coming-bonus-two description-future-finaly">
              As an extra bonus, you'll enjoy exclusive access to a specially tailored job offering pool for EB3 unskilled applicants. Get a head start on your application journey – start applying today!  
              </p>

                          </div></Link>
                          <div className="center-level">
              <Link to='/leveltwo'>
              <button className="btn-levels  ">CHOOSE</button>
              </Link>
              </div>
          </div>


          <div className={user.level >= 3 ? "level-paid" : "levellev"}>
          {
              user.level >= 3 && <p className="coming-newDesign">Paid</p>
            }
             <p className="coming-lev2">in the end of December 2023</p>
            <h2 className="appliName-future">Level 3</h2>
            <h3 className="appliName-names">"Smart immigration with no overpriced assistance"</h3>
            { 
              ((user.level && user.level < 3) || !user.level) &&
            <>
            <div className="price-all">
            {hasInfo && <p className="appliName-levelOne-del price-all">${levelsInfo[2].originalCost}</p>}
              {hasInfo && <p className="appliName-level-two price-all">${levelsInfo[2].cost}</p>}
                </div>
              </>
}<Link to='/levelthree'></Link>
<div className="text-discription-future">
              <p className="description-future ">
              Access to more than 1000 U.S. employers’ database (script of pitch included)
              </p>
              <p className="description-future">
              Access to more than 25 U.S. immigration attorneys’ database 
              </p>
              <p className="description-future ">
              Access to instruction of immigration forms as I-140, I-485, I-765, I-131 and DS-260
              </p>
 <p className="description-future ">
              List of EB3 unskilled agencies
              </p>
              <p className="description-future ">
              48 hours online chat after the consultation
              </p>

              <p className="description-future ">
              Opportunity to complete entire EB3 program from $9999
              </p>
              <p className="coming-bonus">Extra bonus!</p>
              <p className="description-future description-future-finaly "> Be prepared to immerse in English language environment 
              (3 x 30 mins speaking club for you and your kids)
</p></div>
{/* <div className="center-level">
                          <Link to='/levelthree'>
              <button className="btn-levels ">CHOOSE</button>
              </Link>
              </div> */}
                          </div>

          </div>
<div className="grid-future">
          {/* Change the classNames once are made! */}
          <div className="level-future-bot ">
          <div className="text-future-bot">
            <p className="coming">Coming in Q4 2024</p>
            <h2 className="appliName-future">Level 4</h2>
            <h3 className="appliName-names">"Turnkey package"</h3>
              <>
              {hasInfo && <p className="appliName-levelOne price">${levelsInfo[3].cost}</p>}
              </>
            <div className="text-discription-future-bot">
              <p className="description-future-bot ">
              List of the U.S. employers who are ready to file the Labor Certificate and make the petition for Green Card to start your EB3 process
              </p>
              <p className="description-future-bot">
              Attorney and government fees are included 
              </p>
              <p className="description-future-bot description-future-finaly-bot">
              24/7 online support 
              </p>
</div>

                          </div>
            
          </div>
          <div className="level-future-bot ">
            <div className="text-future-bot">
          <p className="coming">Coming in Q4 2024</p>
            <h2 className="appliName-future">Level 5</h2>
            <h3 className="appliName-names">"VIP package"</h3>
              {hasInfo && <p className="appliName-levelOne price">${levelsInfo[4].cost}</p>}
            <div className="text-discription-future-bot">
              <p className="description-future ">
              We will find the U.S. employer based on your request (location, field of business, wage level, etc)
              </p>
              <p className="description-future description-future-finaly-bot">
              Welcome settlement service not limited as rental house, airport pickup, open SSN and bank account, drive license, kids enrollment in school, kindergarten, state tour
              </p>
              </div>
                          </div>
                      </div>
          
        </div>

      </div>
    </>
  );
};

const Testimonials = () => {
    return (
        <>
            <section>
                <div id="testimonials" className="titrecenter ">
                    <p className="titre" data-aos="fade-up">Testimonials</p>
                </div>
                <section className="product">
                    <button className="pre-btn"><img src="/images/left-arrow.png" alt="arrow" width="20" height="20" /></button>
                    <button className="nxt-btn"><img src="/images/right-arrow.png" alt="arrow" width="20" height="20" /></button>
                    <div className="product-container">
                        <div className="product-card">
                            <div className="product-info">
                              <div className=" star">
                                <p className="name">Francisco R.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-all.png" alt="star" width={100} height={20}/>

                                </div>
                                </div>
                                <p className="review">"I had the pleasure of working with this team for my EB3 unskilled process, and
                                 I can't express how grateful I am. Their first-hand experience and extensive knowledge helped to find solutions when my EB3 unskilled case got stuck in the USCIS. Thanks to their expertise, I now hold a U.S. permanent resident card. Highly recommended!"</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Maria S.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-hulf.png" alt="star" width={100} height={20}/>

                                                                </div>
                                </div>
                                <p className="review">"I can't thank this team enough for their incredible support during my EB3 unskilled application. Their unique knowledge and personal involvement in each step of the process made a huge difference.
                                 They provided fast response for a reasonable price." </p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">David L.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-hulf.png" alt="star" width={100} height={20}/>
                                </div>
                                                                </div>
                                <p className="review">"I was fortunate to have this team on my side for my EB3 journey. Their dedication and commitment were evident, and I couldn't be happier with the results. If you're considering the EB3 unskilled route, don't hesitate to reach out to them."</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Carl S.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-all.png" alt="star" width={100} height={20}/>
                                </div>
                                                                </div>
                                <p className="review">"Working with this team was a game-changer for my EB3 unskilled visa journey. Their deep understanding of the program and their ability to simplify complex procedures were invaluable. They were not just consultants; they were partners in my success.
                                 I wholeheartedly endorse their services to anyone seeking reliable guidance."</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Oksana P.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-all.png" alt="star" width={100} height={20}/>
                                </div>
                                </div>
                                <p className="review">"I was skeptical before approaching them, but during the first consultation they laid out all the aspects of the EB3 Unskilled workers program in a very simple manner and we came up with a list of pros and cons.
                                 Now I have a better understanding of all the options I have."</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Maxim F.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-hulf.png" alt="star" width={100} height={20}/>
                                </div>
                                </div>
                                <p className="review">"I couldn't have sorted out the complexities of the EB3 unskilled visa process without the expertise of this team. 
                                Their in-depth knowledge and personalized guidance made me confident I overcome."</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Anton P.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-all.png" alt="star" width={100} height={20}/>
                                </div>
                                </div>
                                <p className="review">"I highly recommend this team to anyone seeking assistance with their EB3 unskilled visa application.
                                 Their professionalism and attention to detail are unparalleled."</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Mario A.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-all.png" alt="star" width={100} height={20}/>
                                </div>
                                </div>
                                <p className="review">"I was supposed to apply for H1B, but when found these guys who answered my questions about EB3 unskilled visa
                                I came to the conclusion that EB3 is the faster way to reach green card."</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Sergey K.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-hulf.png" alt="star" width={100} height={20}/>
                                </div>
                                </div>
                                <p className="review">"I was lost in the EB3 application process until I found this team.
                                 Their unique first-hand experience made all the difference. Thanks!"</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Lucas R.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-all.png" alt="star" width={100} height={20}/>
                                </div>
                                </div>
                                <p className="review">"The team's expertise in EB3 unskilled visas is truly impressive. 
                                 I couldn't have asked for a better support."</p>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-info">
                            <div className=" star">
                                <p className="name">Anna L.</p>
                                <div className="stars-auto">
                                <img className="stars" src="images/star-all.png" alt="star" width={100} height={20}/>
                                </div>
                                </div>
                                <p className="review">"I reached out to this team when I needed help with my EB3 case, and it was the best decision I made.
                                 Their personalized approach, combined with their vast knowledge, gave me the confidence I needed to succeed."</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

const Contacts = () => {
  return (
      <>
          <div className="vie"></div>


          <div  class="contacts-map" >

            <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.2171612892553!2d-80.03051992448948!3d32.91886027360458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe6396fc39530d%3A0xaee5adf21c554e33!2zNjY1MCBSaXZlcnMgQXZlLCBOb3J0aCBDaGFybGVzdG9uLCBTQyAyOTQwNiwg0KHQqNCQ!5e0!3m2!1sru!2sby!4v1699432124178!5m2!1sru!2sby"
             width="600" 
             allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


               <div className="cont">

  <div className="align">
               <h4 class="contact-name" id="contact">Contacts</h4>
                <div className="number-phone">
                <a className="number" href='tel:+1 864 748 9898'>
                  <img src="/images/number.png" alt="phone" width={20} height={20} />  +1 864 748 9898</a>
                              </div>
                              <div className="number-phone">
               <img src="/images/mail.png" alt="phone" width={26} height={20} />
               <a href="mailto:eb3unskilled@visainusa.com" class="number" >eb3unskilled@visainusa.com</a>
                              </div>
                              <br></br>
               <div className="number-phone">
               <img src="/images/home.png" alt="phone" width={30} height={20} />
               <p class="number" >"Visa in USA" Limited Liability Company"
 6650 Rivers Ave Suite 105, North Charleston, South Carolina, 29406</p>
                              </div>
                              </div>
                              <div className="link-column">
                              <a href="https://t.me/eb3visainusa" target="_blank"><img className="link-margin" src="images/telegram.png" alt="telegram" width="38" height="38" /></a>
                        <a href="tel:+79168070961" target="_blank"><img className="link-margin" src="images/whatsapp.png" alt="whatsapp" width="38" height="38" /></a>
                        </div>
               </div>
            </div>

      </>
  )
}


// const Partners = () => {
//     return (
//         <>
//             <div className="partners" >
//                 <div id="#partners" >
//                     <br/>
//                     <br/>
//                     <p className="titre-partners" >Our friends </p>
//                 </div>
//                 <div>
//                     <div className="logo-partners">
//                         <div className="teachbk">
//                             <a href="https://teachbk.com/usa-immigration/" target="_blank" ><img src="/images/logo-teachBK.png" alt="logo" width="200" height="60" className="friend" /></a>
//                             <p className="teach">all about political asylum</p>
//                         </div>
//                         <div className="teachbk">
//                             <a href="https://rubic.us/" target="_blank" ><img src="/images/logo-rubic.svg" alt="logo" width="200" height="60" className="friend" /></a>
//                             <p className=" teach">all about life in the USA</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

const Footer = ({isUser}) => {

    return (
        <>
<hr className="hr-contact"></hr>
            <footer id="contacts" className=" footer">
                <div className="aboutUs">
                        <h4 className="parr4 light-color">About Us</h4>
                    <Link to="/aboutus">
                        <p className="grey marg">Our team</p>
                    </Link>
                    {!isUser && <a href="#advantages">
                        <p className="grey marg">Advantages</p>
                    </a>}
                </div>
                <div className="contacts ">
                    <h4 className="parr4 light-color">Services</h4>
                    <Link to="/abouteb3">
                        <p className="grey marg eb3-un">EB-3 Unskilled Visa</p>
                    </Link>
                    <a href="#pricing">
                        <p className="grey marg">Pricing</p>
                    </a>
                </div>
{  !isUser &&              <div className="contacts ">
                    <h4 className="parr4 light-color">Success Stories</h4>
                    <a href="#testimonials">
                        <p className="grey marg">Testimonials</p>
                    </a>
                </div>}
                <div className="contacts ">
                    <div className="links">
                        <a href="https://t.me/eb3usa" target="_blank"><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/telegram.png?v=1698341412493" alt="telegram" width="38" height="38" /></a>
                                                <a href="https://instagram.com/eb3.visa?igshid=MzMyNGUyNmU2YQ==" target="_blank"><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/instagram.png?v=1698341213474" alt="instagram" width="38" height="38" /></a>
                        <a href="https://www.youtube.com/@EB3unskilled" target="_blank"><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/youtube.png?v=1698341435865" alt="youtube" width="38" height="38" /></a>
                    </div>
                </div>
                
            </footer>
            <div className="created"><p className="we-creat">Created by</p></div>
            <div className="created-we"><a href="https://olya-safronova.glitch.me/" className="we" target="blank"><p > Olya Safronova and</p></a> <a className="we"><p >and</p></a><a className="we " href="https://github.com/maisiukartyom"><p > Artsiom Maisiuk</p></a> </div>
        </>
    )
}

const Index = () => {
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async (level) => {
      try{
          const user = await axios.post("auth/verify",
              {
                  requiredLevel: level
              },
              {
                  withCredentials: true
              })
          if (user.data.isAdmin){
            setIsAdmin(true)
          }
          else{
            setIsAdmin(false)
          }
          setUser({
            email: user.data.email, 
            isAdmin: user.data.isAdmin, 
            level: user.data.level
          })
          setIsUser(true)
          setIsVerified(true)
      }
      catch (err){
          setIsUser(false)
          setIsVerified(true)
      }
      }
    AOS.init();
    verifyCookie(0)
  }, []);

  const logout = () => {
    setUser({})
    setIsAdmin(false)
    setIsUser(false)
  }

  return (
    
    isVerified &&
    <>
        <MainPhoto isUser={isUser} logout={logout} />
        <Main isUser={isUser} user={user} />
        {!isUser && <Testimonials />}
        <Contacts />
        <Footer isUser={isUser} />
        {
          isVerified && !isAdmin && isUser &&           
          <>
            <SupportEngine user={user} />
          </>  
        }
        {
          !isAdmin &&
          <CallForm />
        }
    </>
  );
};

export default Index;
