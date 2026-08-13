import { Search } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";

export default function ListSearch({ handleSearch, search, setSearch }) {
    return (
        <form onSubmit={handleSearch}>
            <InputGroup className="max-w-xs">
                <InputGroupInput
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon align="end">
                    <Button
                        type="submit"
                        variant="ghost"
                        className="px-2 cursor-pointer"
                    >
                        <Search />
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </form>
    );
}
