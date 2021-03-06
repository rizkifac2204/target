import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
// ICON
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloseIcon from "@mui/icons-material/Close";

const Template = ({ children }) => {
  const { data: session } = useSession();
  return (
    <>
      <div id="container">
        <div id="output" className="back-fss"></div>
      </div>
      <div id="loading">
        <div id="preloader">
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="outer-home">
        <section id="home">
          <div id="vegas-background"></div>

          <div className="global-overlay"></div>

          <img
            src="/images/logo-white.png"
            alt=""
            className="brand-logo text-intro opacity-0"
          />

          <div className="content">
            <h1 className="text-intro opacity-0">Selamat Datang</h1>

            <p className="text-intro opacity-0">
              Dilayanan PPID Bawaslu Terintegrasi
            </p>

            <nav>
              <ul>
                <li>
                  <a
                    id="open-more-info"
                    data-target="right-side"
                    className="light-btn text-intro opacity-0"
                  >
                    Formulir
                  </a>
                </li>
                <li>
                  <a
                    data-dialog="somedialog"
                    className="action-btn trigger text-intro opacity-0"
                  >
                    Berlangganan
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="bottom-home">
            <div className="social-icons">
              <a href="#">
                <FacebookIcon />
              </a>
              <a href="#">
                <TwitterIcon />
              </a>
              <a href="#">
                <InstagramIcon />
              </a>
              <a href="#">
                <YouTubeIcon />
              </a>
            </div>
            <p className="copyright">
              ?? Bawaslu - Badan Pengawas Pemilihan Umum
            </p>
          </div>
        </section>
      </div>

      <div className="close-right-part layer-left hide-layer-left"></div>

      <div className="border-right-side hide-border"></div>

      <section id="right-side" className="hide-right">
        <div className="content">
          {children}

          <br />
          <br />
          <h4>PPID Bawaslu</h4>
          <p>
            Terimakasih sudah menggunakan layanan kami. Untuk memberikan
            kritikan dan saran, anda dapat menghubungi kami melalui :
          </p>
          <p>
            <i className="icon ion-ios-telephone"></i> <strong>Phone :</strong>
            08xxxxx <br />
            <i className="icon ion-ios-email"></i> <strong>Email :</strong>
            <a
              ng-href="mailto:rizkifac2204@gmail.com"
              className="phone-mail-link"
            >
              Email
            </a>
            <br />
            <i className="icon ion-ios-location"></i> <strong>Lokasi :</strong>
            alamat
          </p>
          <br />
          <h4>Layanan Terkait</h4>
          <ul>
            <li>
              <Link href="/">
                <a className="phone-mail-link">Formulir Pemohonan Informasi</a>
              </Link>
            </li>
            <li>
              <Link href="/cek">
                <a className="phone-mail-link">Cek Pemohonan Informasi</a>
              </Link>
            </li>
            <li>
              <Link href="/survey">
                <a className="phone-mail-link">Survey Layanan</a>
              </Link>
            </li>
            <li>
              <Link href="/keberatan">
                <a className="phone-mail-link">Pengajuan Keberatan</a>
              </Link>
            </li>
            <li>
              {session ? (
                <Link href="/admin">
                  <a className="phone-mail-link">Halaman Admin</a>
                </Link>
              ) : (
                <Link href="/login">
                  <a className="phone-mail-link">Login</a>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </section>

      <button id="close-more-info" className="close-right-part hide-close">
        <CloseIcon />
      </button>

      <div id="somedialog" className="dialog">
        <div className="dialog__overlay"></div>
        <div className="dialog__content">
          <div className="dialog-inner">
            <h4>Sahabat Bawaslu</h4>
            <p>
              Selalu update informasi terbaru dengan manjadi bagian dari kami
            </p>
            <div id="subscribe">
              <form id="notifyMe" onSubmit={() => console.log("submit")}>
                <div className="form-group">
                  <div className="controls">
                    <input
                      type="text"
                      id="mail-sub"
                      name="email"
                      placeholder="Masukan Email Kamu Disini"
                      // onfocus="this.placeholder = ''"
                      // onblur="this.placeholder = 'Masukan Email Kamu Disini'"
                      className="form-control email srequiredField"
                    />
                    <i className="fa fa-spinner opacity-0"></i>
                    <button className="btn btn-lg submit">Subscribe</button>
                    <div className="clear"></div>
                  </div>
                </div>
              </form>
              <div className="block-message">
                <div className="message">
                  <p className="notify-valid"></p>
                </div>
              </div>
            </div>
          </div>

          <button className="close-newsletter" data-dialog-close>
            <CloseIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Template;
