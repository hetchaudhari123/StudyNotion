import { Link, useNavigate } from "react-router-dom"

export default function Button({ children, active, linkto = 0, onClick,bgColor = false,customClass="" }) {
    const navigate = useNavigate();
    const handleClick = (onClick) ? (onClick) : (() => {});
    return (
        
            (linkto === 0) ? (
                <div onClick={handleClick} className={`cursor-pointer font-medium text-base leading-6 text-center
             ${active ? "bg-yellow-50 text-black shadow-login-btn-become-an-instructor" : `${bgColor !== false ?(bgColor) : "bg-richblack-800"} shadow-login-btn-become-an-instructor text-white`}  px-3 py-2 lg:px-6 lg:py-3  rounded-lg transition-all duration-200 hover:scale-95 
             ${customClass}`}>
                    {children}
                </div>
            ) : (
                <Link to={linkto}>
                    <div className={`font-medium text-base leading-6 text-center
          ${active ? "bg-yellow-50 text-black shadow-login-btn-become-an-instructor" : `${bgColor !== false ?(bgColor) : "bg-richblack-800"} shadow-login-btn-become-an-instructor text-white`}  px-3 py-2 lg:px-6 lg:py-3  rounded-lg transition-all duration-200 hover:scale-95 
          ${customClass}`}>
                        {children}
                    </div>
                </Link>
            )
        

    )
}