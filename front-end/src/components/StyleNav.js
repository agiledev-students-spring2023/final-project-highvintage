import React from 'react'

export default function StyleNav() {
    const styles = ['All', 'Sporty & Athleisure', 'Streetwear', 'Classic', 'Funk', 'Minimal']
    
    return (
        <div>
            <nav className="flex sm:justify-center space-x-4 px-2 bg-white my-8 text-center overflow-x-auto">
                {styles.map((style) => (
                    <div className="rounded-lg px-3 py-2 my-auto text-slate-700 font-semibold active:underline active:underline-offset-4 hover:bg-slate-100 hover:text-slate-900">{style}</div>
                ))}
            </nav>
        </div>
    )
}
