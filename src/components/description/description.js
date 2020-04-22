import React from 'react';

import './description.scss';
import photo from '../../assets/images/my_mug.jpg';

function Description() {
    return (
        <section className='description'>
            <article className='hello col-md-50'>
                <h2>Hi!</h2>
                <h3>Software Developer & Boardgame-loving, Comic-reading Boyfriend.</h3>
                <img src={photo} alt='profile' className='profile'></img>
            </article>
            <article className='intro col-md-50'>
                <h3>Small Intro</h3>
                <p>
                    My name is Anders Bo Rasmussen, and I'm a Software Developer from a small town in Denmark, called Slagelse.
                    I have a bachelor in Software Development, and love to play with new technologies.
                </p>
            </article>
            
        </section>
    );
}

export default Description;