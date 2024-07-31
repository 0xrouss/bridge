export default function TransferFrom() {
    return (
        <div className="bg-red-300">
            <div>
                <p>Transfer from</p>
            </div>

            <div>
                <select>
                    <option value="sepolia">Sepolia</option>
                    <option value="cardona">Cardona</option>
                    <option value="zkyoto">zKyoto</option>
                    <option value="okx">X Testnet</option>
                </select>

                <p>Balance: {"0"}</p>
            </div>
            <div>
                <input type="text" placeholder="0" pattern="[0-9.,]*" />
                <button>MAX</button>
            </div>
        </div>
    );
}
