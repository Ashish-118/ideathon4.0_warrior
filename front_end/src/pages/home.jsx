import React, { useEffect, useState } from "react";
import Fixed from "../components/FixedDoubtRoom.jsx";
import useUser from "../context/user";
import Signup_1 from "../components/signup/Signup1.jsx";
import Room from "../components/chatRoom/room.jsx";
import { PiXCircleFill } from "react-icons/pi";
import useSignup1 from "../context/signup1.jsx";
import Signup_2 from "../components/signup/Signup2.jsx";
function home() {
    const { user } = useUser();
    const { Signup1 } = useSignup1();

    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSignup2Open, setIsSignup2Open] = useState(false);

    const openSignup = () => setIsSignupOpen(true);
    const closeSignup = () => setIsSignupOpen(false);

    useEffect(() => {
        console.log("called this asdf")
        if (user && !(user?.data?.user?.profileComplete)) {
            setIsSignupOpen(false);
            setIsSignup2Open(true);
        }
    }, [])  //  after login when we will navigate to home  , this useEffect will run 

    useEffect(() => {
        console.log("called this")

        if (Signup1 && Signup1?.status === 201) {
            console.log("called this use effect")
            setIsSignupOpen(false);
            setIsSignup2Open(true);
        }


    }, [Signup1])
    return (
        <>

            <div>
                <div className={`home-content ${isSignupOpen ? "blurred" : ""}`}>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero saepe rem doloremque numquam eum. Non, alias nemo reprehenderit numquam voluptas quo, esse distinctio cupiditate vel ratione id mollitia dolorem. Repellat vitae voluptate dolorum ipsa vel? Quas molestiae voluptatem sit ut natus aspernatur, distinctio perspiciatis quam obcaecati totam molestias eius! Ex incidunt vel et? Praesentium tempore vero nemo quis doloremque cumque illum. Qui, rerum illum cum voluptatibus perferendis nisi unde quos aliquam voluptatum architecto adipisci amet similique quo nesciunt ab nam neque non dicta dolores molestiae ipsa. Odio, explicabo? Nam praesentium earum eligendi mollitia nisi veniam aliquid corporis vel numquam. A adipisci, earum magni molestiae doloribus, voluptates sequi, fuga deserunt aperiam molestias ullam doloremque temporibus deleniti voluptate assumenda explicabo nulla quasi optio suscipit? Impedit, quae dolorum. Eius nihil culpa placeat quae ratione corporis suscipit incidunt voluptatem necessitatibus fuga veritatis quos eum dolorum beatae quaerat eligendi quod, aperiam autem nostrum tenetur, reiciendis consequatur rerum. Laboriosam facere quis reprehenderit deserunt labore et, molestiae beatae accusamus sint exercitationem possimus pariatur libero iusto ducimus quisquam! Cupiditate unde iure, assumenda libero ducimus optio necessitatibus voluptatum sapiente minus placeat reiciendis inventore non doloribus possimus numquam mollitia, doloremque deleniti officia. Nemo voluptatem quidem consectetur officia eveniet, nam modi eaque temporibus. Dignissimos quis ipsum quae deleniti pariatur necessitatibus facilis, incidunt animi fuga laudantium, sapiente, atque minus! Blanditiis sint culpa a ab totam quos quisquam odio obcaecati nemo, praesentium voluptas illum hic pariatur ipsa porro soluta consectetur dolor saepe est corrupti sequi aliquam reiciendis minima qui. Quo explicabo iusto ex ipsam, obcaecati fugiat dolorum placeat perferendis suscipit minus ipsum! Reiciendis facilis adipisci, sint nam explicabo corrupti vero nihil architecto non incidunt rerum. Similique quos iusto voluptatibus culpa vitae perspiciatis tenetur possimus? Possimus velit omnis aspernatur cupiditate tempore dolorem perferendis nisi. Vel natus quia est quae aperiam numquam, nulla culpa consequuntur molestiae, aliquam velit corporis sunt? Soluta cum laboriosam voluptas deserunt quo iure necessitatibus ea, sunt dolor non impedit a consequatur vitae accusamus dolore unde voluptates? Sed provident consequuntur distinctio ea eos, illum quibusdam, sequi ipsam molestiae repellat totam sint architecto porro officia vitae. Quo sequi corrupti dolore facere ea recusandae, deleniti ab. Iusto quasi itaque debitis possimus at deserunt voluptates veniam numquam, voluptate nostrum perferendis repudiandae iure voluptas adipisci iste odit non quia accusantium dolor facilis reiciendis! Ipsa consequuntur tempora magni, perspiciatis iure praesentium eum consectetur, sed exercitationem natus molestias distinctio voluptates temporibus vel est officiis delectus? Illum voluptas ratione consequatur voluptates modi labore a facilis excepturi aspernatur. Ex placeat quas atque ut omnis doloribus deserunt quaerat maiores quae eius eaque voluptatem, nisi accusantium dicta qui sed maxime mollitia aspernatur quia animi. Illum fuga iusto excepturi officiis facere, asperiores aliquam ratione officia animi repudiandae praesentium fugiat ad, odit nulla! Modi sed, voluptate accusamus maiores officia, pariatur voluptates aliquam officiis consequatur nobis fugit itaque deserunt fuga quos! Quisquam beatae placeat animi, porro laudantium itaque tenetur ut fuga facere! Dicta minima accusantium nostrum ducimus. Fugit blanditiis nisi, aliquid ullam consequuntur beatae saepe impedit amet dicta a magnam quibusdam provident aspernatur deserunt sequi.
                        lpa corporis voluptatibus odio error accusantium optio amet, sequi alias, quas eaque dignissimos modi, eos dicta. Inventore pariatur labore dolores, unde sunt quasi, exercitationem error quo dolorem qui expedita itaque assumenda provident. Deleniti sit nihil reiciendis animi molestias ipsam voluptate quod, totam dignissimos et dolore iusto ullam maiores, in voluptatem. Non cumque vitae adipisci impedit molestiae totam. Repellendus temporibus numquam eos molestiae veritatis eveniet, officia nisi incidunt quasi id, vero assumenda corporis quam unde placeat laboriosam, nostrum quo velit ipsam repellat. Repellat tempora quia facere est incidunt, totam magni voluptatibus atque consectetur ut veritatis impedit harum earum nihil, nesciunt vel reprehenderit explicabo asperiores ducimus. Sit expedita corporis voluptate magni blanditiis suscipit delectus quo ex facere numquam beatae nobis repellendus labore harum, voluptatibus ut? Et beatae sed doloremque, obcaecati, officiis blanditiis minus dolorem hic deserunt mollitia impedit recusandae ex vel error voluptates illo aut ratione repellat tempore provident saepe. Similique repellat pariatur corporis! Praesentium ut voluptate hic libero repellat cupiditate nihil modi eaque vitae impedit debitis ipsa maiores, accusamus accusantium autem quisquam obcaecati quis ipsum sit repudiandae, dolore ea. Sed natus quis non fugit doloribus eligendi accusantium nostrum alias excepturi! Est, aperiam omnis, ea explicabo enim repellat illo expedita inventore deleniti ad rerum totam cumque sint ut cum veritatis possimus nisi! Numquam natus expedita aliquam in libero facilis molestiae iure facere, harum ipsum quisquam, quam rerum consequatur suscipit debitis nihil nostrum est earum ipsa! Mollitia, nobis officia vitae dolor voluptatem alias quis, nemo sunt molestias nihil, magnam accusamus consequuntur. Accusamus vel nihil est cumque dicta cupiditate odio officiis facere fugit officia laborum minus rerum, porro neque iusto! Totam voluptas quae delectus magni possimus tenetur repellendus nihil illum quaerat minus ipsam commodi suscipit at fugit quas dolore nobis, corporis voluptates veritatis cupiditate iste? Nobis possimus inventore deleniti pariatur iusto perferendis odio, facilis suscipit, cum tempore, ducimus sapiente quisquam quibusdam consectetur adipisci quae sunt molestias eligendi hic? Laboriosam illum molestiae eum labore voluptates eligendi impedit vitae asperiores, itaque temporibus obcaecati ab ut. Cum repellendus animi ducimus odit sint aperiam, ratione consequuntur minus totam? Beatae possimus laborum perspiciatis molestiae adipisci, quisquam fugiat, quaerat labore magnam qui et quasi a dolores in repudiandae perferendis quis tenetur ad eum dolorem totam ipsa porro. Rem, asperiores officia? Id, labore. Veniam, aliquid earum dicta dolore rem, voluptate nesciunt est id eius dolores labore, et nulla. Sunt nulla, maxime ea nesciunt cupiditate voluptatem placeat. Unde quas fuga totam exercitationem ex porro, ipsam illo magni sunt nam distinctio ullam repellendus delectus odio saepe eveniet recusandae. Eveniet consequatur impedit, cum temporibus at tempore ipsum animi nulla laborum illo sed, quod veritatis distinctio, fugit corrupti assumenda sequi. Ea optio, natus recusandae assumenda rerum incidunt asperiores molestiae aut a voluptate illo soluta temporibus commodi laboriosam vero nobis beatae esse doloremque nemo!
                    </p>
                    <button onClick={openSignup}>Sign Up</button>
                </div>

                {isSignupOpen &&
                    <>
                        <Signup_1 closeSignup1={closeSignup} />
                    </>
                }
                {isSignup2Open &&
                    <>
                        <Signup_2 />
                    </>
                }

                <Fixed />
            </div>

        </>
    )
}


export default home