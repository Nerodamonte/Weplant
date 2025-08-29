CREATE TABLE attachments
(
    attachment_id BIGSERIAL PRIMARY KEY,
    attachmenturl VARCHAR(255)
);

CREATE TABLE images
(
    image_id    BIGSERIAL PRIMARY KEY,
    template_id BIGINT,
    image_url   VARCHAR(255)
);

CREATE TABLE packages
(
    package_id          BIGSERIAL PRIMARY KEY,
    package_name        VARCHAR(255),
    package_description VARCHAR(255),
    package_price       BIGINT
);

CREATE TABLE payments
(
    payment_id BIGSERIAL PRIMARY KEY,
    user_id    BIGINT,
    price      BIGINT,
    date       TIMESTAMP WITHOUT TIME ZONE,
    status     VARCHAR(255)
);

CREATE TABLE projects
(
    project_id    BIGSERIAL PRIMARY KEY,
    user_id       BIGINT,
    template_id   BIGINT,
    payment_id    BIGINT,
    package_id    BIGINT,
    attachment_id BIGINT,
    project_name  VARCHAR(255),
    description   VARCHAR(255),
    status        VARCHAR(255),
    create_at     TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE templates
(
    template_id   BIGSERIAL PRIMARY KEY,
    template_name VARCHAR(255),
    description   VARCHAR(255),
    create_at     TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE users
(
    user_id      BIGSERIAL PRIMARY KEY,
    user_name    VARCHAR(255),
    email        VARCHAR(255),
    password     VARCHAR(255),
    phone_number BIGINT,
    role         VARCHAR(255),
    create_at    TIMESTAMP WITHOUT TIME ZONE
);

ALTER TABLE projects
    ADD CONSTRAINT uc_projects_attachmentid UNIQUE (attachment_id);

ALTER TABLE images
    ADD CONSTRAINT FK_IMAGES_ON_TEMPLATEID FOREIGN KEY (template_id) REFERENCES templates (template_id);

ALTER TABLE payments
    ADD CONSTRAINT FK_PAYMENTS_ON_USERID FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_ATTACHMENTID FOREIGN KEY (attachment_id) REFERENCES attachments (attachment_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_PACKAGEID FOREIGN KEY (package_id) REFERENCES packages (package_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_PAYMENTID FOREIGN KEY (payment_id) REFERENCES payments (payment_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_TEMPLATEID FOREIGN KEY (template_id) REFERENCES templates (template_id);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_USERID FOREIGN KEY (user_id) REFERENCES users (user_id);
