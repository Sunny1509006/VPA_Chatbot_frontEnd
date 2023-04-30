import React, { useEffect, useState } from 'react';
import './BodyHead.css'
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function BodyHead() {

  return (
    <>
      <div className='header_main'>
        <div className='Header_logo'>
          <div >
              <img src="/images/header_image.png" className='ilkms_logo' />
          </div>
        </div>
      </div>
    </>
  );
}
