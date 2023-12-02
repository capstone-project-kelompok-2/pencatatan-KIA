export default function InputNumber ({value, handle}) {

    return (
        <input type="number" onChange={handle} value={value} className="w-[272px] h-[22px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md" />
    )
}