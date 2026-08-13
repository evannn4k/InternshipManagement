export default function PageHeader({
    title,
    description,
    leftActions,
    rightActions,
}) {
    return (
        <div className="typeset typeset-docs flex flex-col gap-4">
            <div className="">
                <h1>{title}</h1>
                <p className="m-0">{description}</p>
            </div>
            <div className="flex justify-between gap-2">
                {leftActions}
                {rightActions}
            </div>
        </div>
    );
}
