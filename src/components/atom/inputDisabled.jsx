export default function InputDisabled ({value, handle, type}) {

    return (
        <input disabled type={type} onChange={handle} value={value} className="border border-primary w-[272px] h-[22px] mix-blend-soft-light bg-white/90 px-4 py-2 rounded-[25px] shadow-md" />
    )
}