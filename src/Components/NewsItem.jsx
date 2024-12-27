  
import default_image from './Assets/image_converted.jpg';
const NewsItem = ({title,description,imageUrl,newsUrl}) => {
   return (
     <div className="container my-3">
       <div className="card" style={{width: "18rem"}}>
       <img src={imageUrl ? imageUrl : default_image} className="card-img-top" alt="..." />
       <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a href={newsUrl} target="_blank" className="btn btn-primary">Read more...</a>
  </div>
</div>



     </div>
   )
 }
 
 export default NewsItem
 