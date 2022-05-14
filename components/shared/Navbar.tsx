import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { SearchBar } from "../home/SearchBar";

export const Navbar: FC = () => {
	const { data, status } = useSession();

	const isAuthenticated = status === "authenticated";
	const isUnauthenticated = status === "unauthenticated";

	const { onToggle } = useDisclosure({
		defaultIsOpen: true,
	});

	return (
		<Box css={{ display: "sticky" }}>
			<HStack w="100vw" justifyContent={"space-between"} backgroundColor="gray.500" py={4} px={20}>
				<Flex grow={2}>
					<Text color="white" fontWeight={600} fontSize={20}>
						Zaint
					</Text>
				</Flex>
				<Flex grow={5}>
					<SearchBar />
				</Flex>
				<Flex grow={2} justifyContent="end">
					{isAuthenticated && (
						<Menu onOpen={onToggle} onClose={onToggle}>
							<MenuButton
								as={Avatar}
								src={data?.user?.image ?? ""}
								borderRadius={8}
								w={10}
								h={10}
							></MenuButton>
							<MenuList>
								<Link href="/account">
									<MenuItem>Account</MenuItem>
								</Link>
								<MenuItem>
									<Button py={1} onClick={() => signOut()} w="full">
										Logout
									</Button>
								</MenuItem>
							</MenuList>
						</Menu>
					)}
					{isUnauthenticated && (
						<>
							<Button onClick={() => signIn()}>Sign in</Button>
						</>
					)}
				</Flex>
			</HStack>
		</Box>
	);
};
