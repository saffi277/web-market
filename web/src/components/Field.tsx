type BaseProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  dir?: "rtl" | "ltr";
};

const inputClass =
  "w-full rounded-xl border border-[#8b5cf6]/20 bg-white/[0.04] px-4 py-3 text-sm outline-none transition-colors focus:border-[#8b5cf6]/60 disabled:opacity-50";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  dir,
}: BaseProps & { type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#cbd5e1]">
        {label}
        {required && <span className="text-[#d844ff]"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        dir={dir ?? (type === "email" || type === "tel" ? "ltr" : "rtl")}
        className={inputClass}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
}: BaseProps & { rows?: number }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#cbd5e1]">
        {label}
        {required && <span className="text-[#d844ff]"> *</span>}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${inputClass} resize-y leading-7`}
      />
    </label>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: Omit<BaseProps, "placeholder"> & { options: string[]; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[#cbd5e1]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${value ? "text-white" : "text-[#64748b]"}`}
      >
        <option value="">{placeholder ?? "اختر..."}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0d0b18]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
