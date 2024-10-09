import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="about Img"/>
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus vero eos assumenda dignissimos labore modi, nemo, harum sunt et, ipsam perspiciatis velit obcaecati corporis laboriosam id in ut accusantium saepe!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, eveniet ratione accusantium facilis voluptate consequuntur deserunt mollitia, corrupti cupiditate vel sequi id veniam suscipit voluptatum natus iste repellendus eaque sapiente.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, nostrum, consequuntur aspernatur distinctio unde voluptates tempora exercitationem earum illum nulla commodi quo voluptas velit libero quam error adipisci ut debitis!</p>
      </div>

    </div>
  )
}

export default Biography
