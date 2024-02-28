function Header ({ title }) {
    return ( 
        <div className="bg-gray-300 p-12">
            <h1 className="text-4xl">
                {title}
            </h1>
        </div>
    );
}

export { Header };