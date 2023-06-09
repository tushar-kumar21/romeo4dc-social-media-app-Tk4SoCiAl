import React, { useLayoutEffect } from 'react'
import { useSocial } from '@/context/Context';
import { useFirebase } from '@/firebase/firebase';
import { ReelsComp } from '@/components/ReelsComp'
import { ReelsApiComp } from '@/components/ReelsApiComp';
import { Header } from '@/components/Header'
import { LeftBar } from '@/components/LeftBar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';

const auth = getAuth();

const Reels = () => {
  const [isUser, setIsUser] = useState(false);
  const fb = useFirebase();
  const { getGradientData, gradientBackground, getFontsSizeData, getBackgroundImage, getThemesData, getCommentsData, GetVideosData } = fb;
  const popUpBox = useSocial();
  const { setBtn, setCreateBtn } = popUpBox;
  const router = useRouter();

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true)
      } else {
        router.push("/Login")
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    setCreateBtn(false)
    GetVideosData()
    getGradientData()
    getFontsSizeData()
    getBackgroundImage()
    getThemesData()
    getCommentsData()
    window.onscroll = () => {
      if (window.pageYOffset >= 70) {
        document.querySelector(".navbar").style.position = "fixed";
        document.querySelector(".navbar").style.padding = "1.4em 5em";
        document.querySelector(".navbar").style.background = "#fff";
        if (document.querySelector('.reels-container')) {
          document.querySelector('.reels-container').style.paddingTop = "6em";
        }
      }
      else {
        document.querySelector(".navbar").style.position = "relative";
        document.querySelector(".navbar").style.padding = "2em 5em";
        document.querySelector(".navbar").style.background = "transparent";
        if (document.querySelector('.reels-container')) {
          document.querySelector('.reels-container').style.paddingTop = "2em";
        }

      }
    }
  }, [])
  return (
    <>
      {isUser &&
        <>
          <Header />
          <div className="reels-container" >
            <div className="reels-sub-container">
              <ReelsApiComp />
            </div>
            <LeftBar />
          </div>
        </>
      }
    </>
  )
}
export default Reels;