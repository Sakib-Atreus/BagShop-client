const ReuseSubHeader = ({ title, subtitle }) => {
    return (
        <div className="h-[270px] w-full bg-gradient-to-r from-[#F1FBFF] to-[#F8DAB0] text-center py-16">
            <h1 className="font-[Geist] font-bold text-[40px] sm:text-[50px] md:text-[60px] lg:text-[72px] leading-tight tracking-[-1%]">
                {title}
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">{subtitle}</p>
        </div>
    );
};

export default ReuseSubHeader;
