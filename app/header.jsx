import React from 'react'
import Link from 'next/link'
import { LogoutBtn, Context } from '../components/Clients'

const header = () => {
    return (
        <div className='header'>
            <div>
                <h2>Todo.</h2>
            </div>
            <article>
                <Link href={"/"}>Home</Link>
                <Link href={"/profile"}>Profile</Link>
                <LogoutBtn />
            </article>
        </div>
    )
}

export default header