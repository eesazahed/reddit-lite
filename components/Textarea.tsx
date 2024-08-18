import { NextPage } from "next";

interface Props {
  parentData: string;
  updateParent: Function;
  label?: string;
  placeholder: string;
  small?: boolean;
  autoFocus?: boolean;
}

const Textarea: NextPage<Props> = ({
  label,
  placeholder,
  parentData,
  updateParent,
  small,
  autoFocus,
}) => {
  return (
    <div className="mt-7">
      <label
        className={`block ${small ? "text-sm" : "text-base"} mb-2`}
        htmlFor="textarea"
      >
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        id="textarea"
        className={`${
          small ? "text-sm h-[75px]" : "text-base h-[100px]"
        } shadow appearance-none border rounded py-2 px-3 w-full resize-none leading-tight focus:outline-none focus:shadow-outline`}
        value={parentData}
        onChange={(e) => updateParent(e.target.value)}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Textarea;
