export default function PageHeader({
    title,
    titleAddOn,
    description,
    leftActions,
    rightActions,
}) {
    return (
        <div className="typeset typeset-docs flex flex-col gap-4">
            <div className="">
                <div className="flex gap-4 items-center">
                    <h1 className="m-0">{title}</h1>
                    <div className="m-0 flex items-center h-full">{titleAddOn}</div>
                </div>
                <p className="m-0">{description}</p>
            </div>
            <div className="flex justify-between gap-2">
                {leftActions}
                {rightActions}
            </div>
        </div>
    );
}
