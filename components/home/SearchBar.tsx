import { FormControl } from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import debounce from "lodash.debounce";
import { ChangeEvent, FC, useCallback, useState } from "react";

export const SearchBar: FC = () => {
	const [input, setInput] = useState("");
	const [query, setQuery] = useState("");

	const debounceQuery = useCallback((next: string) => debounce(() => setQuery(next), 800), []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		
		setInput(value.toString());
		debounceQuery(value);
	};

	return (
		<FormControl>
			<AutoComplete openOnFocus>
				<AutoCompleteInput
					bg="white"
					type="number"
					placeholder="Search for a product"
					value={input}
					onChange={handleChange}
				/>
				<AutoCompleteList>
					{[1, 2, 3, 4, 5].map((n, id) => (
						<AutoCompleteItem
							key={`option-${id}`}
							value={n.toString()}
							color="white"
							textTransform="capitalize"
						>
							{n.toString()}
						</AutoCompleteItem>
					))}
				</AutoCompleteList>
			</AutoComplete>
		</FormControl>
	);
};
