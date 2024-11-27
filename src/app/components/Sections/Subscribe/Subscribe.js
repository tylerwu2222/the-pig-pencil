import NewsletterForm from "../NewsletterForm/NewsletterForm";
import './Subscribe.css';

export default function Subscribe() {
  return (
    <div className="container-narrow containerBottom">
      <div className="newsletter-div">
        <h2>Subscribe to The Pig Pencil!</h2>
        <img
          src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWV4YmM0ZXhodTY5bXY0MXhtNDF1dTdxenRucnZlbXlqbGRpODdpeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DDDlEDTnE8T1NnJ3aA/giphy.gif'
          alt='grogu-eats'
          style={{maxWidth: '80vw', border: '2px black solid', borderRadius: '5px'}}
        ></img>
        <p>Enter your email below and select which topics you would like to hear about (you can also update your existing subscription).</p>
        <NewsletterForm />
      </div>
    </div>
  )
}
