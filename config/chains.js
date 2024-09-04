export const chains = {
    11155111: 0,
    2442: 1,
    6038361: 2,
};

export const chainSelectorOptions = [
    {
        label: "Sepolia",
        imageSrc: "/eth.svg",
        chainId: 11155111,
        explorer: "https://sepolia.etherscan.io/",
    },
    {
        label: "Cardona",
        imageSrc: "/polygon.svg",
        chainId: 2442,
        explorer: "https://cardona-zkevm.polygonscan.com/",
    },
    {
        label: "zKyoto",
        imageSrc: "/zkyoto.svg",
        chainId: 6038361,
        explorer: "https://zkyoto.explorer.startale.com/",
    },
];

export const chainsIndexed = {
    0: chainSelectorOptions[0],
    1: chainSelectorOptions[1],
    2: chainSelectorOptions[2],
};
