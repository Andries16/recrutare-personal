import { Edit, List, Person } from "@mui/icons-material";

export default function HowItWorks() {
  return (
    <>
      <section
        className="how-it-works position-relative bg-color pt-110 lg-pt-80 pb-110 lg-pb-70"
        style={{
          margin: "0px",
          padding: "0px",
          boxSizing: "border-box",
          paddingTop: "110px",
          paddingBottom: "110px",
          background: "#222831",
          position: "relative",
        }}
      >
        <div
          className="container"
          style={{
            margin: "0px",
            padding: "0px",
            boxSizing: "border-box",
            width: "100%",
            marginRight: "auto",
            marginLeft: "auto",
            maxWidth: "1320px",
            paddingRight: "0px",
            paddingLeft: "0px",
          }}
        >
          <div
            className="title-one text-center mb-65 lg-mb-40 wow fadeInUp"
            style={{
              margin: "0px",
              padding: "0px",
              boxSizing: "border-box",
              marginBottom: "65px",
              animationName: "fadeInUp",
              visibility: "visible",
              animationDelay: "0.3s",
              textAlign: "center",
            }}
          >
            <h2
              className="text-white"
              style={{
                padding: "0px",
                boxSizing: "border-box",
                fontFamily:
                  '"__EB_Garamond_95782f","__EB_Garamond_Fallback_95782f"',
                fontWeight: 500,
                fontSize: "70px",
                lineHeight: "1.041em",
                margin: "0px",
                marginTop: "0px",
                marginBottom: "0px",
                color: "rgba(255,255,255,1)",
              }}
            >
              Cum{" "}
              <span
                className="position-relative"
                style={{
                  margin: "0px",
                  padding: "0px",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                lucrează?
              </span>
            </h2>
          </div>
          <div
            className="row justify-content-center"
            style={{
              margin: "0px",
              padding: "0px",
              boxSizing: "border-box",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "calc(-1*0)",
              marginRight: "calc(-.5*1.5rem)",
              marginLeft: "calc(-.5*1.5rem)",
              justifyContent: "center",
            }}
          >
            <div
              className="col-xxl-3 col-lg-4 col-md-6"
              style={{
                margin: "0px",
                padding: "0px",
                boxSizing: "border-box",
                maxWidth: "100%",
                paddingRight: "calc(1.5rem*.5)",
                paddingLeft: "calc(1.5rem*.5)",
                marginTop: "0",
                flex: "0 0 auto",
                flexShrink: 0,
                width: "25%",
              }}
            >
              <div
                className="card-style-two text-center mt-25 wow fadeInUp"
                style={{
                  margin: "0px",
                  padding: "0px",
                  boxSizing: "border-box",
                  marginTop: "25px",
                  animationName: "fadeInUp",
                  visibility: "visible",
                  textAlign: "center",
                }}
              >
                <div
                  className="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
                  style={{
                    padding: "0px",
                    boxSizing: "border-box",
                    background: "#76ABAE",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    borderRadius: "50%",
                  }}
                >
                  <Person sx={{ fontSize: "40px" }} />
                </div>
                <div
                  className="title fw-500 text-white"
                  style={{
                    padding: "0px",
                    boxSizing: "border-box",
                    fontWeight: 500,
                    margin: "25px 0px 12px",
                    fontSize: "22px",
                    color: "rgba(255,255,255,1)",
                  }}
                >
                  Create Account
                </div>
                <p
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "border-box",
                    marginTop: "0px",
                    marginBottom: "1rem",
                    lineHeight: "2em",
                    color: "#76ABAE",
                  }}
                >
                  It’s very easy to open an account and start your journey.
                </p>
              </div>
            </div>
            <div
              className="col-xxl-3 col-lg-4 col-md-6 m-auto"
              style={{
                padding: "0px",
                boxSizing: "border-box",
                maxWidth: "100%",
                paddingRight: "calc(1.5rem*.5)",
                paddingLeft: "calc(1.5rem*.5)",
                flex: "0 0 auto",
                flexShrink: 0,
                width: "25%",
                margin: "auto",
                marginTop: "auto",
              }}
            >
              <div
                className="card-style-two text-center mt-25 wow fadeInUp"
                style={{
                  margin: "0px",
                  padding: "0px",
                  boxSizing: "border-box",
                  marginTop: "25px",
                  animationName: "fadeInUp",
                  visibility: "visible",
                  textAlign: "center",
                }}
              >
                <div
                  className="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
                  style={{
                    boxSizing: "border-box",
                    background: "#76ABAE",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    borderRadius: "50%",
                  }}
                >
                  <List sx={{ fontSize: "40px" }} />
                </div>
                <div
                  className="title fw-500 text-white"
                  style={{
                    padding: "0px",
                    boxSizing: "border-box",
                    fontWeight: 500,
                    margin: "25px 0px 12px",
                    fontSize: "22px",
                    color: "rgba(255,255,255,1)",
                  }}
                >
                  Complete your profile
                </div>
                <p
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "border-box",
                    marginTop: "0px",
                    marginBottom: "1rem",
                    lineHeight: "2em",
                    color: "#76ABAE",
                  }}
                >
                  Complete your profile with all the info to get attention of
                  client.
                </p>
              </div>
            </div>
            <div
              className="col-xxl-3 col-lg-4 col-md-6"
              style={{
                margin: "0px",
                padding: "0px",
                boxSizing: "border-box",
                maxWidth: "100%",
                paddingRight: "calc(1.5rem*.5)",
                paddingLeft: "calc(1.5rem*.5)",
                marginTop: "0",
                flex: "0 0 auto",
                flexShrink: 0,
                width: "25%",
              }}
            >
              <div
                className="card-style-two text-center mt-25 wow fadeInUp"
                style={{
                  margin: "0px",
                  padding: "0px",
                  boxSizing: "border-box",
                  marginTop: "25px",
                  animationName: "fadeInUp",
                  visibility: "visible",
                  textAlign: "center",
                }}
              >
                <div
                  className="icon rounded-circle d-flex align-items-center justify-content-center m-auto"
                  style={{
                    padding: "0px",
                    boxSizing: "border-box",
                    background: "#76ABAE",
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    borderRadius: "50%",
                  }}
                >
                  <Edit sx={{ fontSize: "40px" }} />
                </div>
                <div
                  className="title fw-500 text-white"
                  style={{
                    padding: "0px",
                    boxSizing: "border-box",
                    fontWeight: 500,
                    margin: "25px 0px 12px",
                    fontSize: "22px",
                    color: "rgba(255,255,255,1)",
                  }}
                >
                  Apply job or hire
                </div>
                <p
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "border-box",
                    marginTop: "0px",
                    marginBottom: "1rem",
                    lineHeight: "2em",
                    color: "#76ABAE",
                  }}
                >
                  Apply & get your preferable jobs with all the requirements and
                  get it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
