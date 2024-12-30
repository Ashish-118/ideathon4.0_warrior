

export default function ShowFiles({ filePath, index }) {
    return (
        <div className={`mr-1 w-fit w-max-[100px] break-words  px-3 rounded-lg mb-1 h-auto text-white ${index % 2 === 0 ? 'bg-orange-400' : 'bg-blue-400'}`} >
            <p>{filePath.name}</p>
        </div>
    )
}