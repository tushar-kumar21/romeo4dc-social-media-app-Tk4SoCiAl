import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

const reelsFetcher = async (url) => {
 try{
    const response = await fetch(url,{
        headers : {
            Authorization: 'v57ka443EQ0G2plWF7DhtsDupxFfYa1vVx0s2A0kAiOvqKrhbhglz2Uf',
        }
    })
    const reelsApiData = await response.json();
    return reelsApiData;
 }catch(error){
    console.log(error)
 }
}
export const ReelsApiComp=()=>{
const [page, setPage] = useState(1);
 const [loading, setLoading] = useState(true);
const [speaker, setSpeaker] = useState(true);
const [reelPlayer, setReelPlayer] = useState(true);
const [reelsData, setReelsData] = useState(null); 
const [reel, setReel] = useState();    

const { data : reelsApiData, error: reelsError } =  useSWR(`https://api.pexels.com/videos/
popular?page=${page}&per_page=5`, reelsFetcher);
useEffect(()=>{
    setLoading(true)
    if(reelsApiData){
    setReelsData(prev => prev ?  [...prev,  ...reelsApiData.videos] : [...reelsApiData.videos])
}
setLoading(false)
},[reelsApiData, page]);

const handleScroll=()=>{
    if(window.innerHeight + document.documentElement.scrollTop + 1 
      >= document.documentElement.scrollHeight
      ){
        setLoading(true)
      setPage(prev => prev + 1)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    return ()=>window.removeEventListener('scroll', handleScroll)
  },[])


const Reaction=(e)=>{
    if(e.target.classList.contains('reels-likes')){
     e.target.src = "/assets/red-heart.svg";
     e.target.style.filter="unset";
     e.target.classList.remove('reels-likes')
     e.target.classList.add('reels-dislike')
    }
    else{
      e.target.src="/assets/like.svg";
      e.target.style.filter="invert(1)";
      e.target.classList.remove('reels-dislike')
      e.target.classList.add('reels-likes')
    }
    }
    return(
        <>
                {
                reelsData ?
                  reelsData.map((media, ind) => {
                        return (
                            <React.Fragment key={media.id}>                                
                                    <div className="reelspost" key={media.id + 1}>
                                        <div className="reelsinfo">
                                            <div className="videocont">
                                            <video src={media.video_files[0].link}  id={`video-${ind}`}  autoPlay={ind === reel && reelPlayer} loop onClick={() => {             
                                                  setReel(ind)                             
                                                  reelPlayer ? setReelPlayer(false) : setReelPlayer(true)
                                                  ind === reel && reelPlayer ?
                                                   document.getElementById(`video-${ind}`).play()
                                                   : 
                                                  document.querySelectorAll('video').forEach((vide) =>vide.pause())
                                                }
                                                }
                                                />
                                            </div>
                                            <div className="reelsdescription">
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '.8em',
                                                    cursor: 'pointer',
                                                    maxWidth:'200px',
                                                    fontSize:'.9rem'
                                                }}>
                                                    <Image src={`https://res.cloudinary.com/demo/image/fetch/${media.video_pictures[0].picture}`}
                                                        width={32}
                                                        height={32} alt="randomImage" style={{ filter: 'unset' }} />
                                                    <span>{media.user.name}</span>
                                                    <Image src={`assets/dot.svg`} width={10} height={20} alt="randomImage" style={{
                                                        transform: 'scale(3)'
                                                    }} />
                                                    <span>Follow</span>
                                                </div>
                                                <div className="caption">
                                                    <span style={{
                                                        fontSize: '.9rem',
                                                        letterSpacing: '.3px',
                                                        position:'relative',
                                                    }}>{`This video is from ${media.url}`}</span>
                                                    <span style={{ color: 'rgb(141 141 141)' }}> ...more</span>
                                                    <div className="reaction" onClick={Reaction}>
                                                        <div className="reels like">
                                                                    <Image src={`assets/like.svg`} width={28} height={28} alt="randomImage"  className='reels-likes'/>
                                                            <span>300k</span>
                                                        </div>

                                                        <div className="reels comment" >
                                                            <Image src={`assets/comments.svg`} width={28} height={28} alt="randomImage" />
                                                            <span>899</span>
                                                        </div>

                                                        <div className="reels share" style={{ filter: 'invert(1)' }}>
                                                            <Image src={`assets/share.svg`} width={28} height={28} alt="randomImage" />
                                                        </div>

                                                        <div className="reels bookmark" >
                                                            <Image src={`assets/bookmark.svg`} width={30} height={30} alt="randomImage" />
                                                        </div>

                                                        <div className="reels more" >
                                                            <Image src={`assets/more.svg`} width={18} height={18} alt="randomImage" />
                                                        </div>

                                                        <div className="reels song-img" >
                                                            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} width={22} height={22} alt="randomImage" />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="music">
                                                    <Image src={`assets/music.svg`}
                                                        width={10}
                                                        height={20} alt="randomImage" />
                                                    <div className="musiccontainer">
                                                        <span>asas dasdasda <Image src={`assets/dot.svg`}
                                                            width={10}
                                                            height={20} alt="randomImage" style={{ transform: 'scale(1.2)' }} /> adasdasd</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="buttons">
                                                {
                                                    speaker ?
                                                        (<Image src={`assets/speakeron.svg`} width={18} height={18} alt="randomImage" style={{ transform: 'scale(2)' }} onClick={() =>{ 
                                                            setSpeaker(false)
                                                            const vidEle = document.getElementById(`video-${ind}`)
                                                            vidEle.muted = true;                                                            
                                                            }}/>)
                                                        :
                                                        (<Image src={`assets/speakeroff.svg`} width={18} height={18} alt="randomImage" style={{ transform: 'scale(2)' }} onClick={() =>{ 
                                                            setSpeaker(true)
                                                            const vidEle = document.getElementById(`video-${ind}`)
                                                            vidEle.muted = false;
                                                        }}/>)
                                                }
                                            </div>                                            
                                            <div className={ ind === reel && reelPlayer ? "play pause-reel" : "play play-reel"}>
                                                <Image src={`assets/play.svg`} width={22} height={22} alt="randomImage" onClick={() =>
                                                {
                                                     setReelPlayer(false)
                                                     ind === reel && reelPlayer ? document.getElementById(`video-${ind}`).play() :  document.querySelectorAll('video').forEach((vide) =>vide.pause())
                                                     }} />
                                            </div>
                                        </div>
                                    </div>
                                

                            </React.Fragment>
                        )
                    })
                    :
                    <div className="loading-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        filter:'hue-rotate(45deg) drop-shadow(2px -1px 6px black)'
                    }}>
                        <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="randomImage" style={{
                            height: "200px",
                            width: "200px"
                        }} />
                    </div>
            }
            {
                loading &&
                <div className="loading-cards" style={{height:"300px!important"}}>          
          <img src="https://i.giphy.com/media/yyqOUPn5souNBSHUnU/giphy.webp" alt="" />         
          </div>          
               
            }
        </>
    )
}