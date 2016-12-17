import React from 'react';


const Pictures = (props) => {
const {allPictures, authenticated, voted, voteOnImage,
      hideBrokenAvatarImg, hideBrokenAvatar,
      hideBrokenImage, removeBrokenImage,
       deleteImage, hoverMessage, triggerHoverMessage,
       hoverBoxStyle, triggerHoverBoxStyle,
      triggerUserImages} = props;

if(allPictures.length > 0){

const hasVoted = (e) => {
  e.preventDefault();

  const reg = /(\d+)/;
  const index = Number(reg.exec(e.target.className)[0]);
  const pictureID = allPictures[index]._id;

if(authenticated){
  voteOnImage(pictureID);//to server showing voted on image
}

}

const avatarError = () => {
  hideBrokenAvatarImg(true);//hides avatar if link broken
}

const imgError = (e) => {
  const reg = /(\d+)/;
  const index = Number(reg.exec(e.target.className)[0]);
  const pictureID = allPictures[index]._id;
  removeBrokenImage(pictureID);//changes img status to broken
}

const triggerDeleteAction = (e) => {
  const reg = /(\d+)/;
  const index = Number(reg.exec(e.target.className)[0]);
  const pictureID = allPictures[index]._id;
  deleteImage(pictureID);
}

const hoveringMouseIn = (e) => {
const string = e.target.className, substringUser = 'user', substringLike = 'like',
substringDelete = 'delete';
const xOffset = Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
const yOffset = Math.max(document.documentElement.scrollTop,document.body.scrollTop) - 70;

if(string.indexOf(substringUser) !== -1){
  triggerHoverMessage('user');//picks correct message

}
else if(string.indexOf(substringDelete) !== -1){
  triggerHoverMessage('delete');
}
else if(string.indexOf(substringLike) !== -1){
  triggerHoverMessage('like');
}
const style = {left:e.clientX + xOffset, top:e.clientY + yOffset, visibility:'show'}
triggerHoverBoxStyle(style);//shows hovering div message
}

const hoveringMouseOut = (e) => {
  const style = {display:'none'};
triggerHoverBoxStyle(style);
}

const showUserImages = (e) => {
  const reg = /(\d+)/;
  const index = Number(reg.exec(e.target.className)[0]);
  const userID = allPictures[index].userID;
  triggerUserImages(allPictures,userID);//filters only user's images
}

const pictureList = allPictures.map((elem, i) => {
  const userAvatarStyle =  {background:elem.colour};
  const userCanLikeImage = authenticated ? '' : 'notAllowed';
  const brokenAvatar = hideBrokenAvatar ? {display: 'none'} : {};
  const brokenImage = elem.broken ? {display:'none'} : {};
  const wrapperHeight = elem.broken ? {height: '150px'} : {};

  const deleteButton =  () => {
    const id = localStorage.getItem('id');//adds delete button to user's images
    const pictureID = allPictures[i]._id;
     if(allPictures[i].userID === id){
       return(
         <img src="../../style/img/bin.png" onMouseOver={hoveringMouseIn}
         onMouseOut={hoveringMouseOut} onClick={triggerDeleteAction} className={i +" deletePictureImg"} />
       )
     }
     return;
   }

  return (
    <div key={"pictures" + i} className="grid-item">
      <div style={wrapperHeight} className="imgRequestedWrapper">
        <img src={elem.imageURL} onError={imgError} style={brokenImage} className={i + " imageRequested"}/>
      </div>
      <div className="imgNameWrapper">{elem.imageName}</div>
        <div className="userInfoContainers">
          <div style={userAvatarStyle} onClick={showUserImages} onMouseOver={hoveringMouseIn} onMouseOut={hoveringMouseOut} className={i + " userImageWrapper"}>
              <img onError={avatarError} style={brokenAvatar} className="userImages" src={elem.userImage} />
            </div>
            {deleteButton()}
            <div className={i + " likeCounts " + userCanLikeImage} onMouseOver={hoveringMouseIn} onMouseOut={hoveringMouseOut} onClick={hasVoted}>
              <img src="../../style/img/star.png" /><span>{elem.likes}</span>
          </div>
        </div>
    </div>
  )
})

return(
  <div id="grid">
  <div style={hoverBoxStyle} id="hoveringInfoDiv">{hoverMessage}</div>
  <div className="grid-sizer"></div>
  {pictureList}
  </div>
)


}
else{
  return <div></div>
}

}


//export default Pictures;
