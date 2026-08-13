import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function ListFilter({ handleFilter, options }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
                Filter
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Filter</DropdownMenuLabel>
                    {options.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleFilter(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
