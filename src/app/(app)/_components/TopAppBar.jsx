"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import LogoThinkTwiceColor from "./logo-think-twice-color.svg";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";

const TopAppBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const pageConfigs = {
    "/": {
      title: "think twice",
      leftIcon: null,
      rightIcon: null,
      showLogo: true,
      bgColor: "bg-white",
      textColor: "text-blue-700",
    },
    "/post-creation": {
      title: "Create New Post",
      leftIcon: "back",
      rightIcon: null,
      showLogo: false,
      bgColor: "bg-white",
      textColor: "text-black",
    },
    "/profile": {
      title: "Profile",
      leftIcon: null,
      rightIcon: null,
      showLogo: false,
      bgColor: "bg-white",
      textColor: "text-black",
    },
    "/edit-profile": {
      title: "Edit profile",
      leftIcon: "close",
      rightIcon: null,
      showLogo: false,
      bgColor: "bg-white",
      textColor: "text-black",
    },
    "/post": {
      title: "Post Detail",
      leftIcon: "back",
      rightIcon: null,
      showLogo: false,
      bgColor: "bg-white",
      textColor: "text-black",
    },
  };

  const getCurrentConfig = () => {
    if (pathname.startsWith("/post/") && pathname.endsWith("/edit")) {
      return {
        title: "Edit Post",
        leftIcon: "back",
        rightIcon: null,
        showLogo: false,
        bgColor: "bg-white",
        textColor: "text-black",
      };
    }
    if (pathname.startsWith("/post/") && pathname.length > "/post/".length) {
      return pageConfigs["/post"];
    }

    return pageConfigs[pathname] || pageConfigs["/"];
  };

  const config = getCurrentConfig();

  const handleLeftIconClick = () => {
    if (config.leftIcon === "back") {
      router.back();
    } else if (config.leftIcon === "close") {
      router.push("/");
    }
  };

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const renderLeftIcon = () => {
    if (!config.leftIcon) return null;

    const IconComponent = config.leftIcon === "back" ? ArrowLeft : X;

    return (
      <button
        onClick={handleLeftIconClick}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={config.leftIcon === "back" ? "Go back" : "Close"}
      >
        <IconComponent size={24} className={config.textColor} />
      </button>
    );
  };

  const renderTitle = () => {
    if (config.showLogo) {
      return (
        <button
          onClick={handleLogoClick}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src={LogoThinkTwiceColor}
            alt="Think Twice Logo"
            width={100}
            height={50}
            className={cn("h-6 w-auto", FontBrand.className)}
          />
        </button>
      );
    }

    return (
      <h1
        className={cn(
          "text-lg font-semibold",
          config.textColor,
          FontBrand.className
        )}
      >
        {config.title}
      </h1>
    );
  };

  return (
    <header
      className={`${config.bgColor} border-b ${
        hasScrolled ? "border-gray-200" : "border-transparent"
      } fixed top-0 z-10 w-full max-w-lg transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between h-14 px-4 w-full max-w-lg mx-auto">
        <div className="flex items-center min-w-0">
          {renderLeftIcon()}
          <div className="ml-2">{renderTitle()}</div>
        </div>

        <div className="flex items-center space-x-2"></div>
      </div>
    </header>
  );
};

export default TopAppBar;
